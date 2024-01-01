import {
  DISH_IN_ORDER_STATUSES,
  ICurrentOrder,
  ORDER_STATUSES,
  OrderStatus,
} from "donut-shared";
import { IOrder } from "donut-shared/src/actions/orders.js";
import { logWarn } from "donut-shared/src/lib/log.js";
import {
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
  dish,
  employee,
  modification,
  order,
  orderToDish,
  orderToDishToModification,
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
  statuses?: OrderStatus[];
  orderNumber?: string;
  strictOrderNumberCompare?: boolean;
  orderBy?: "desc" | "asc";
  search?: string;
  ongoingOnly?: boolean;
}

export interface IGetOrdersPage extends IGetOrder {
  page: number;
  perPage: number;
}

// TODO: optimize...
export async function getOrdersPage(params: IGetOrdersPage) {
  console.time("get_orders");

  const orders = db
    .select()
    .from(order)
    .orderBy(makeOrderByFilter(params, order.createdDate))
    .where(makeWhereFilter(params))
    .offset((params.page - 1) * params.perPage)
    .limit(params.perPage)
    .as("order");

  const data = await db
    .select()
    .from(orders)
    .leftJoin(orderToDish, eq(orderToDish.orderId, order.id))
    .leftJoin(dish, eq(dish.id, orderToDish.dishId))
    .leftJoin(
      orderToDishToModification,
      eq(orderToDishToModification.orderToDishId, orderToDish.id)
    )
    .leftJoin(
      modification,
      eq(modification.id, orderToDishToModification.modificationId)
    )
    .leftJoin(employee, eq(employee.id, order.employeeId))
    .leftJoin(client, eq(client.id, order.clientId))
    .leftJoin(diningTable, eq(diningTable.id, order.diningTableId))
    .orderBy(makeOrderByFilter(params, orders.createdDate));

  const total = await db
    .select({
      value: sql`count('*')`.mapWith(Number),
    })
    .from(order)
    .where(makeWhereFilter(params));

  console.timeEnd("get_orders");

  return { ordersPage: ordersAdapter(data), total: total?.[0].value || 0 };
}

export async function getSingleOrder(orderNumber: string, userId?: string) {
  const result = await getOrdersPage({
    employeeId: userId, // TODO: this may aslo be a client id...
    page: 1,
    perPage: 1,
    orderNumber: orderNumber,
    strictOrderNumberCompare: true,
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
    params.employeeId ? eq(order.employeeId, params.employeeId) : undefined,
    params.orderNumber
      ? ilike(
          order.number,
          params.strictOrderNumberCompare
            ? params.orderNumber?.trim()
            : `%${params.orderNumber.trim()}%`
        )
      : undefined,
    params.search
      ? or(
          ilike(order.number, `%${params.search}%`),
          ilike(order.comment, `%${params.search}%`),
          ilike(diningTable.number, `%${params.search}%`)
        )
      : undefined,
    params.ongoingOnly
      ? or(
          not(eq(order.status, ORDER_STATUSES.DELIVERED)),
          isNull(order.paidDate)
        )
      : undefined,
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

// TODO: find a way to make it faster (store jsons?)
export async function createOrder(
  data: ICurrentOrder,
  employeeId: string
): Promise<IOrder> {
  const orderNumber = generateOrderNumber();
  const existing = await db
    .select()
    .from(order)
    .where(eq(order.number, orderNumber));

  if (existing?.length) {
    throw new Error(`Duplicate order number was generated: ${orderNumber}`);
  }

  const orderToCreate = { id: generateUuid(), ...data };

  await db.transaction(async (tx) => {
    await tx.insert(order).values({
      id: orderToCreate.id,
      comment: data.comment,
      employeeId: employeeId,
      number: orderNumber,
      diningTableId: data.table?.id || null,
      createdDate: new Date(),
      status: ORDER_STATUSES.CREATED,
    });

    await Promise.all([
      ...data.dishes.map(async (dish) => {
        const orderToDishUuid = generateUuid();

        await tx.insert(orderToDish).values({
          id: orderToDishUuid,
          dishCount: dish.count,
          dishId: dish.dishId,
          orderId: orderToCreate.id,
        });

        return Promise.all(
          dish.modifications.map((modification) =>
            tx.insert(orderToDishToModification).values({
              id: generateUuid(),
              modificationCount: modification.count,
              modificationId: modification.id,
              orderToDishId: orderToDishUuid,
            })
          )
        );
      }),
    ]);
  });

  return await getSingleOrder(orderNumber);
}

export async function startCookingDish(orderId: string, dishIdInOrder: string) {
  await db.transaction(async (tx) => {
    const theOrder = (
      await tx.select().from(order).where(eq(order.id, orderId))
    )[0];

    if (!theOrder?.cookingDate) {
      await tx
        .update(order)
        .set({
          status: ORDER_STATUSES.COOKING,
          cookingDate: new Date(),
        })
        .where(eq(order.id, orderId));
    }

    await tx
      .update(orderToDish)
      .set({
        status: DISH_IN_ORDER_STATUSES.COOKING,
        cookingDate: new Date(),
      })
      .where(eq(orderToDish.id, dishIdInOrder));
  });
}

export async function finishCookingDish(
  orderId: string,
  dishIdInOrder: string
) {
  return await db.transaction(async (tx) => {
    const theOrder = (
      await db.select().from(order).where(eq(order.id, orderId))
    )[0];

    const dishes = await tx
      .select()
      .from(orderToDish)
      .where(eq(orderToDish.orderId, orderId));

    const leftToCook =
      dishes.length - dishes.filter((x) => x.cookedDate)?.length;

    if (leftToCook - 1 === 0 && !theOrder?.cookedDate) {
      await tx
        .update(order)
        .set({
          status: ORDER_STATUSES.COOKED,
          cookedDate: new Date(),
        })
        .where(eq(order.id, orderId));
    }

    await tx
      .update(orderToDish)
      .set({
        status: DISH_IN_ORDER_STATUSES.COOKED,
        cookedDate: new Date(),
      })
      .where(eq(orderToDish.id, dishIdInOrder));

    return (
      await getCookedDishes(theOrder?.employeeId || "", dishIdInOrder, tx)
    )[0];
  });
}

export async function deliverDish(orderId: string, dishIdInOrder: string) {
  return await db.transaction(async (tx) => {
    const theOrder = (
      await db.select().from(order).where(eq(order.id, orderId))
    )[0];

    const dishes = await tx
      .select()
      .from(orderToDish)
      .where(eq(orderToDish.orderId, orderId));

    const leftToDeliver =
      dishes.length - dishes.filter((x) => x.deliveredDate)?.length;

    if (leftToDeliver - 1 === 0 && !theOrder?.deliveredDate) {
      await tx
        .update(order)
        .set({
          status: ORDER_STATUSES.DELIVERED,
          deliveredDate: new Date(),
        })
        .where(eq(order.id, orderId));
    }

    await tx
      .update(orderToDish)
      .set({
        status: DISH_IN_ORDER_STATUSES.DELIVERED,
        deliveredDate: new Date(),
      })
      .where(eq(orderToDish.id, dishIdInOrder));

    return (
      await getOrdersShallow(
        {
          orderNumber: theOrder?.number || "",
          strictOrderNumberCompare: true,
        },
        tx
      )
    )[0];
  });
}

export async function getOrdersShallow(params: IGetOrder, dbOrTx = db) {
  const data = await dbOrTx
    .select()
    .from(order)
    .where(makeWhereFilter(params))
    .leftJoin(employee, eq(employee.id, order.employeeId))
    .leftJoin(diningTable, eq(diningTable.id, order.diningTableId))
    .leftJoin(client, eq(client.id, order.clientId));

  return shallowOrdersAdapter(data);
}

export async function getCookedDishes(
  employeeId: string,
  dishIdInOrder?: string,
  dbOrTx = db
) {
  const dishes = await dbOrTx
    .select()
    .from(order)
    .where(eq(order.employeeId, employeeId))
    .leftJoin(employee, eq(employee.id, order.employeeId))
    .leftJoin(client, eq(client.id, order.clientId))
    .leftJoin(
      orderToDish,
      and(
        eq(order.id, orderToDish.orderId),
        eq(orderToDish.status, DISH_IN_ORDER_STATUSES.COOKED)
      )
    )
    .where(dishIdInOrder ? eq(orderToDish.id, dishIdInOrder) : undefined)
    .leftJoin(dish, eq(dish.id, orderToDish.dishId))
    .leftJoin(diningTable, eq(diningTable.id, order.diningTableId))
    .orderBy(asc(order.createdDate));

  return cookedDishesAdapter(dishes);
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
