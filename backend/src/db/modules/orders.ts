import { ICurrentOrder } from "donut-shared";
import {
  ORDER_STATUSES,
  ORDER_STATUSES_ARR,
  OrderStatus,
} from "donut-shared/src/constants.js";
import { and, desc, eq, ilike, sql } from "drizzle-orm";
import {
  client,
  dish,
  employee,
  modification,
  order,
  orderToDish,
  orderToDishToModification,
  orderToOrderStatus,
} from "migrations/schema.js";
import { ordersAdapter } from "src/db/schema-to-model-adapters.js";
import { generateOrderNumber } from "src/lib/generate-order-number.js";
import { generateUuid } from "../../lib/uuid.js";
import { db } from "../index.js";

export interface IGetOrdersPage {
  page: number;
  perPage: number;
  employeeId?: string;
  status?: OrderStatus;
  orderNumber?: string;
  strictOrderNumberCompare?: boolean;
}

// TODO: optimize...
export async function getOrdersPage(params: IGetOrdersPage) {
  console.time("get_orders");

  const statusSortHelper = db
    .select({
      orderId: orderToOrderStatus.orderId,
      date: orderToOrderStatus.date,
    })
    .from(orderToOrderStatus)
    .where(eq(orderToOrderStatus.orderStatusId, ORDER_STATUSES.CREATED.id))
    .as("otos");

  const orders = db
    .select()
    .from(order)
    .leftJoin(statusSortHelper, eq(order.id, statusSortHelper.orderId))
    .orderBy(desc(statusSortHelper.date))
    .where(makeWhereFilter(params))
    .offset((params.page - 1) * params.perPage)
    .limit(params.perPage)
    .as("order");

  const data = await db
    .select()
    .from(orders)
    .leftJoin(orderToOrderStatus, eq(order.id, orderToOrderStatus.orderId))
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
    .orderBy(desc(orders.otos.date));

  const total = await db
    .select({
      value: sql`count('*')`.mapWith(Number),
    })
    .from(order)
    .where(makeWhereFilter(params));

  console.timeEnd("get_orders");

  return { ordersPage: ordersAdapter(data), total: total?.[0].value || 0 };
}

export async function getSingleOrder(orderNumber: string, userId: string) {
  const result = await getOrdersPage({
    employeeId: userId, // TODO: this will be a client id
    page: 1,
    perPage: 1,
    orderNumber: orderNumber,
    strictOrderNumberCompare: true,
  });
  return result.ordersPage?.[0] || null;
}

export async function getCreatedOrders() {
  const result = await getOrdersPage({
    page: 1,
    perPage: 100,
    status: "created",
  });
  return result.ordersPage;
}

function makeWhereFilter(params: IGetOrdersPage) {
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
    params.status
      ? sql`EXISTS ${filterByOrderStatusSubquery(params.status)}`
      : undefined
  );
}

function filterByOrderStatusSubquery(status: OrderStatus): any {
  const statusId = ORDER_STATUSES_ARR.find((x) => x.name === status)?.id || "";
  return db
    .select()
    .from(
      db
        .select()
        .from(orderToOrderStatus)
        .where(eq(orderToOrderStatus.orderId, order.id))
        .orderBy(desc(orderToOrderStatus.date))
        .limit(1)
        .as("order_to_order_status")
    )
    .where(eq(orderToOrderStatus.orderStatusId, statusId));
}

// TODO: find a way to make it faster
export async function createOrder(data: ICurrentOrder, employeeId: string) {
  const orderToCreate = { id: generateUuid(), ...data };

  await db.transaction(async (tx) => {
    const orderNumber = generateOrderNumber();
    const existing = await tx
      .select()
      .from(order)
      .where(eq(order.number, orderNumber));

    if (existing?.length) {
      throw new Error(`Duplicate order number was generated: ${orderNumber}`);
    }

    await tx.insert(order).values({
      id: orderToCreate.id,
      comment: data.comment,
      tableNumber: data.tableNumber,
      employeeId: employeeId,
      number: orderNumber,
    });

    await Promise.all([
      tx.insert(orderToOrderStatus).values({
        id: generateUuid(),
        date: new Date(),
        orderId: orderToCreate.id,
        orderStatusId: ORDER_STATUSES.CREATED.id,
      }),
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

  return orderToCreate;
}
