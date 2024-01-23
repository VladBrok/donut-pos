import {
  DISH_IN_ORDER_STATUSES,
  ORDER_STATUSES,
  OrderStatus,
  OrderType,
} from "donut-shared";
import { ICookedOrder, IOrder } from "donut-shared/src/actions/orders.js";
import { logWarn } from "donut-shared/src/lib/log.js";
import {
  Param,
  and,
  asc,
  desc,
  eq,
  ilike,
  isNotNull,
  isNull,
  not,
  or,
  sql,
} from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";
import {
  client,
  diningTable,
  employee,
  order,
  orderToDishes,
} from "migrations/schema.js";
import {
  cookedDishesAdapter,
  ordersAdapter,
  shallowOrdersAdapter,
} from "src/db/schema-to-model-adapters.js";
import { generateOrderNumber } from "src/lib/generate-order-number.js";
import { generateUuid } from "../../lib/uuid.js";
import { db } from "../index.js";

export interface IGetOrder {
  employeeId?: string;
  clientId?: string;
  statuses?: OrderStatus[];
  orderNumber?: string;
  strictOrderNumberCompare?: boolean;
  orderBy?: "desc" | "asc";
  search?: string;
  completed?: boolean;
  orderId?: string;
  orderType?: OrderType;
}

export interface IGetOrdersPage extends IGetOrder {
  page: number;
  perPage: number;
}

export async function getOrdersPage(params: IGetOrdersPage) {
  console.time("get_orders");

  const diningTableEmployee = db
    .select()
    .from(employee)
    .as("diningTableEmployee");

  const data = await db
    .select()
    .from(order)
    .leftJoin(orderToDishes, eq(order.id, orderToDishes.orderId))
    .leftJoin(employee, eq(employee.id, order.employeeId))
    .leftJoin(client, eq(client.id, order.clientId))
    .leftJoin(diningTable, eq(diningTable.id, order.diningTableId))
    .leftJoin(
      diningTableEmployee,
      eq(diningTableEmployee.id, diningTable.employeeId)
    )
    .where(makeWhereFilter(params))
    .orderBy(makeOrderByFilter(params, order.createdDate))
    .offset((params.page - 1) * params.perPage)
    .limit(params.perPage);

  const total = await db
    .select({
      value: sql`count('*')`.mapWith(Number),
    })
    .from(order)
    .leftJoin(diningTable, eq(diningTable.id, order.diningTableId))
    .where(makeWhereFilter(params));

  console.timeEnd("get_orders");

  return { ordersPage: ordersAdapter(data), total: total?.[0].value || 0 };
}

export async function getSingleOrder(
  orderNumber?: string,
  userId?: string,
  orderId?: string
) {
  const isClient = !userId
    ? false
    : (await db.select().from(client).where(eq(client.id, userId)))?.[0];
  const result = await getOrdersPage({
    clientId: !isClient ? undefined : userId,
    page: 1,
    perPage: 1,
    orderNumber: orderNumber,
    strictOrderNumberCompare: true,
    orderId: orderId,
  });
  return result.ordersPage?.[0] || null;
}

export async function getOrdersForKitchen() {
  const result = await getOrdersPage({
    page: 1,
    perPage: Number.MAX_SAFE_INTEGER,
    statuses: ["created", "cooking"],
    orderBy: "asc",
  });
  return result.ordersPage;
}

export function makeOrderByFilter(params: IGetOrder, createdDateCol: PgColumn) {
  return params.orderBy === "asc" ? asc(createdDateCol) : desc(createdDateCol);
}

function makeWhereFilter(params: IGetOrder) {
  return and(
    params.orderType ? eq(order.type, params.orderType) : undefined,
    params.employeeId ? eq(order.employeeId, params.employeeId) : undefined,
    params.clientId ? eq(order.clientId, params.clientId) : undefined,
    params.orderNumber
      ? ilike(
          order.number,
          params.strictOrderNumberCompare
            ? params.orderNumber?.trim()
            : `%${params.orderNumber.trim()}%`
        )
      : undefined,
    params.orderId ? eq(order.id, params.orderId) : undefined,
    params.search
      ? or(
          ilike(order.number, `%${params.search}%`),
          ilike(order.comment, `%${params.search}%`),
          ilike(diningTable.number, `%${params.search}%`)
        )
      : undefined,
    params.completed == null
      ? undefined
      : params.completed
      ? and(
          eq(order.status, ORDER_STATUSES.DELIVERED),
          not(isNull(order.paidDate))
        )
      : or(
          not(eq(order.status, ORDER_STATUSES.DELIVERED)),
          isNull(order.paidDate)
        ),
    params.statuses
      ? or(
          ...params.statuses.map((status) =>
            status === "paid"
              ? isNotNull(order.paidDate) // Special case for "paid" status
              : eq(order.status, status)
          )
        )
      : undefined
  );
}

export async function createOrder(
  data: IOrder,
  userId: string,
  isClient?: boolean
): Promise<IOrder> {
  const orderNumber = generateOrderNumber();
  const existing = await db
    .select()
    .from(order)
    .where(eq(order.number, orderNumber));

  if (existing?.length) {
    throw new Error(`Duplicate order number was generated: ${orderNumber}`);
  }

  const orderToCreate = { ...data, id: generateUuid() };

  await db.transaction(async (tx) => {
    await tx.insert(order).values({
      id: orderToCreate.id,
      comment: data.comment,
      type: data.type,
      employeeId: isClient ? data.table?.employee.id : userId,
      clientId: !isClient ? null : userId,
      number: orderNumber,
      diningTableId: data.table?.id || null,
      deliveryAddress: sql`${new Param(data.address)}`,
      createdDate: new Date(),
      status: ORDER_STATUSES.CREATED,
    });

    await tx.execute(
      sql`INSERT INTO ${orderToDishes} VALUES (${generateUuid()}, ${
        orderToCreate.id
      }, ${new Param(data.dishes)})`
    );
  });

  return await getSingleOrder(orderNumber);
}

export async function startCookingDish(orderId: string, dishIdInOrder: string) {
  await db.transaction(async (tx) => {
    await tx
      .update(order)
      .set({
        status: ORDER_STATUSES.COOKING,
        cookingDate: new Date(),
      })
      .where(and(eq(order.id, orderId), isNull(order.cookingDate)));

    // TODO: prevent sql injection
    await tx.execute(
      sql.raw(`
UPDATE order_to_dishes
SET dishes = jsonb_set(
    jsonb_set(
      dishes, 
      (
          SELECT ('{' || index - 1 || ',status}')::text[]
          FROM jsonb_array_elements(dishes) WITH ORDINALITY arr(elem, index)
          WHERE (elem ->> 'dishIdInOrder')::text = '${dishIdInOrder}'
      ),
      '"${DISH_IN_ORDER_STATUSES.COOKING}"'
    ), 
    (
        SELECT ('{' || index - 1 || ',cookingDate}')::text[]
        FROM jsonb_array_elements(dishes) WITH ORDINALITY arr(elem, index)
        WHERE (elem ->> 'dishIdInOrder')::text = '${dishIdInOrder}'
    ),
    '"${new Date().toISOString()}"'
)
WHERE dishes @? '$[*].dishIdInOrder ? (@ == "${dishIdInOrder}")'
`)
    );
  });
}

export async function finishCookingOrder(orderId: string) {
  await db
    .update(order)
    .set({
      status: ORDER_STATUSES.COOKED,
      cookedDate: new Date(),
    })
    .where(eq(order.id, orderId));
  return (
    await getOrdersShallow({
      orderId: orderId,
      strictOrderNumberCompare: true,
    })
  )[0];
}

export async function finishCookingDish(dishIdInOrder: string) {
  await db.execute(
    sql.raw(`
  UPDATE order_to_dishes
  SET dishes = jsonb_set(
      jsonb_set(
        dishes, 
        (
            SELECT ('{' || index - 1 || ',status}')::text[]
            FROM jsonb_array_elements(dishes) WITH ORDINALITY arr(elem, index)
            WHERE (elem ->> 'dishIdInOrder')::text = '${dishIdInOrder}'
        ),
        '"${DISH_IN_ORDER_STATUSES.COOKED}"'
      ), 
      (
          SELECT ('{' || index - 1 || ',cookedDate}')::text[]
          FROM jsonb_array_elements(dishes) WITH ORDINALITY arr(elem, index)
          WHERE (elem ->> 'dishIdInOrder')::text = '${dishIdInOrder}'
      ),
      '"${new Date().toISOString()}"'
  )
  WHERE dishes @? '$[*].dishIdInOrder ? (@ == "${dishIdInOrder}")'
  `)
  );

  return (await getCookedDishes(undefined, dishIdInOrder))[0];
}

export async function deliverDish(orderId: string, dishIdInOrder: string) {
  await db.execute(
    sql.raw(`
  UPDATE order_to_dishes
  SET dishes = jsonb_set(
      jsonb_set(
        dishes, 
        (
            SELECT ('{' || index - 1 || ',status}')::text[]
            FROM jsonb_array_elements(dishes) WITH ORDINALITY arr(elem, index)
            WHERE (elem ->> 'dishIdInOrder')::text = '${dishIdInOrder}'
        ),
        '"${DISH_IN_ORDER_STATUSES.DELIVERED}"'
      ), 
      (
          SELECT ('{' || index - 1 || ',deliveredDate}')::text[]
          FROM jsonb_array_elements(dishes) WITH ORDINALITY arr(elem, index)
          WHERE (elem ->> 'dishIdInOrder')::text = '${dishIdInOrder}'
      ),
      '"${new Date().toISOString()}"'
  )
  WHERE order_id = '${orderId}' AND dishes @? '$[*].dishIdInOrder ? (@ == "${dishIdInOrder}")'
  `)
  );

  await db
    .update(order)
    .set({
      status: ORDER_STATUSES.DELIVERED,
      deliveredDate: new Date(),
    })
    .where(
      and(
        eq(order.id, orderId),
        eq(
          sql.raw(`(
            SELECT dishes @? '$[*].deliveredDate ? (@ == "")' 
            FROM order_to_dishes
            WHERE dishes @? '$[*].dishIdInOrder ? (@ == "${dishIdInOrder}")'
          )`),
          false
        )
      )
    );

  return (
    await getOrdersShallow({
      orderId: orderId,
      strictOrderNumberCompare: true,
    })
  )[0];
}

export async function deliverOrder(orderId: string, clientId: string) {
  const theOrder = (
    await db.select().from(order).where(eq(order.id, orderId))
  )?.[0];

  if (theOrder?.deliveredDate) {
    logWarn("Tried to mark already delivered order as delivered");
    return;
  }

  if (!theOrder?.paidDate) {
    throw new Error("Can mark order as delivered only if it was paid");
  }

  await db
    .update(order)
    .set({
      status: ORDER_STATUSES.DELIVERED,
      deliveredDate: new Date(),
    })
    .where(and(eq(order.id, orderId), eq(order.clientId, clientId)));

  return (
    await getOrdersShallow({
      orderId: orderId,
    })
  )[0];
}

export async function getOrdersShallow(params: IGetOrder, dbOrTx = db) {
  const diningTableEmployee = db
    .select()
    .from(employee)
    .as("diningTableEmployee");

  const data = await dbOrTx
    .select()
    .from(order)
    .where(makeWhereFilter(params))
    .leftJoin(employee, eq(employee.id, order.employeeId))
    .leftJoin(diningTable, eq(diningTable.id, order.diningTableId))
    .leftJoin(
      diningTableEmployee,
      eq(diningTableEmployee.id, diningTable.employeeId)
    )
    .leftJoin(client, eq(client.id, order.clientId));

  return shallowOrdersAdapter(data);
}

export async function getCookedOrders(
  clientId: string,
  orderType: OrderType
): Promise<ICookedOrder[]> {
  return (
    await getOrdersShallow({
      clientId: clientId,
      statuses: ["cooked"],
      orderType: orderType,
    })
  ).map((x) => ({
    order: x,
  }));
}

export async function getCookedDishes(
  employeeId?: string,
  dishIdInOrder?: string,
  dbOrTx = db
) {
  const diningTableEmployee = db
    .select()
    .from(employee)
    .as("diningTableEmployee");

  const dishes = await dbOrTx
    .select()
    .from(order)
    .leftJoin(employee, eq(employee.id, order.employeeId))
    .leftJoin(client, eq(client.id, order.clientId))
    .leftJoin(diningTable, eq(diningTable.id, order.diningTableId))
    .leftJoin(
      diningTableEmployee,
      eq(diningTableEmployee.id, diningTable.employeeId)
    )
    .leftJoin(orderToDishes, eq(orderToDishes.orderId, order.id))
    .where(
      and(
        employeeId ? eq(order.employeeId, employeeId) : undefined,
        sql.raw(`dishes @? '$[*].cookedDate ? (@ != "")'`),
        sql.raw(`dishes @? '$[*].deliveredDate ? (@ == "")'`),
        dishIdInOrder
          ? sql.raw(
              `dishes @? '$[*].dishIdInOrder ? (@ == "${dishIdInOrder}")'`
            )
          : undefined
      )
    )
    .orderBy(asc(order.createdDate));

  return cookedDishesAdapter(dishes, dishIdInOrder);
}

export async function payForOrder(orderNumber: string) {
  /* 
    Note that we don't set status as "paid" because an order can be, for example, 
    in status "delivering" and "paid" at the same time
  */
  const currentOrder = (
    await db.select().from(order).where(eq(order.number, orderNumber))
  )[0];

  if (!currentOrder?.paidDate) {
    await db
      .update(order)
      .set({
        paidDate: new Date(),
      })
      .where(eq(order.number, orderNumber));
  } else {
    logWarn(`Tried to pay for already paid order ${orderNumber}`);
  }

  return (
    await getOrdersShallow({
      orderNumber: orderNumber,
      strictOrderNumberCompare: true,
    })
  )[0];
}
