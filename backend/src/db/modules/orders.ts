import { ICurrentOrder } from "donut-shared";
import { ORDER_STATUSES, OrderStatus } from "donut-shared/src/constants.js";
import { and, desc, eq, ilike, sql } from "drizzle-orm";
import {
  client,
  dish,
  employee,
  modification,
  order,
  orderStatus,
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
  employeeId: string;
  status?: OrderStatus;
  orderNumber?: string;
  strictOrderNumberCompare?: boolean;
}

// TODO: add index to status name
// TODO: optimize...
export async function getOrdersPage(params: IGetOrdersPage) {
  const data = await db
    .select()
    .from(
      db
        .select()
        .from(order)
        .where(makeWhereFilter(params))
        .offset((params.page - 1) * params.perPage)
        .limit(params.perPage)
        .as("order")
    )
    .leftJoin(orderToOrderStatus, eq(order.id, orderToOrderStatus.orderId))
    .leftJoin(orderStatus, eq(orderToOrderStatus.orderStatusId, orderStatus.id))
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
    .leftJoin(client, eq(client.id, order.clientId));

  const total = await db
    .select({
      value: sql`count('*')`.mapWith(Number),
    })
    .from(order)
    .where(makeWhereFilter(params));

  return { ordersPage: ordersAdapter(data), total: total?.[0].value || 0 };
}

export async function getSingleOrder(orderNumber: string, userId: string) {
  const result = await getOrdersPage({
    employeeId: userId,
    page: 1,
    perPage: 1,
    orderNumber: orderNumber,
    strictOrderNumberCompare: true,
  });
  return result.ordersPage?.[0] || null;
}

function makeWhereFilter(params: IGetOrdersPage) {
  return and(
    eq(order.employeeId, params.employeeId),
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
  return db
    .select({
      codeName: orderStatus.codeName,
    })
    .from(
      db
        .select()
        .from(orderToOrderStatus)
        .where(eq(orderToOrderStatus.orderId, order.id))
        .orderBy(desc(orderToOrderStatus.date))
        .leftJoin(
          orderStatus,
          eq(orderStatus.id, orderToOrderStatus.orderStatusId)
        )
        .limit(1)
        .as("order_status")
    )
    .where(eq(orderStatus.codeName, status));
}

// TODO: find a way to make it faster
export async function createOrder(data: ICurrentOrder, employeeId: string) {
  const orderToCreate = { id: generateUuid(), ...data };

  await db.transaction(async (tx) => {
    await tx.insert(order).values({
      id: orderToCreate.id,
      comment: data.comment,
      tableNumber: data.tableNumber,
      employeeId: employeeId,
      number: generateOrderNumber(),
    });

    const status = await tx
      .select()
      .from(orderStatus)
      .where(eq(orderStatus.codeName, ORDER_STATUSES.CREATED));

    await Promise.all([
      tx.insert(orderToOrderStatus).values({
        id: generateUuid(),
        date: new Date(),
        orderId: orderToCreate.id,
        orderStatusId: status?.[0]?.id || "",
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
