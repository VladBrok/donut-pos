import { ICurrentOrder } from "donut-shared";
import { IOrder } from "donut-shared/src/actions/orders.js";
import {
  DISH_IN_ORDER_STATUSES,
  ITEMS_PER_PAGE,
  ORDER_STATUSES,
  OrderStatus,
} from "donut-shared/src/constants.js";
import { and, asc, desc, eq, ilike, or, sql } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";
import {
  client,
  dish,
  employee,
  modification,
  order,
  orderToDish,
  orderToDishToModification,
} from "migrations/schema.js";
import {
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
    perPage: ITEMS_PER_PAGE * 3,
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
    params.statuses
      ? or(...params.statuses.map((status) => eq(order.status, status)))
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
      tableNumber: data.tableNumber,
      employeeId: employeeId,
      number: orderNumber,
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

    if (theOrder?.status === ORDER_STATUSES.CREATED) {
      await tx.update(order).set({
        status: ORDER_STATUSES.COOKING,
        cookingDate: new Date(),
      });
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
  await db.transaction(async (tx) => {
    const theOrder = (
      await tx.select().from(order).where(eq(order.id, orderId))
    )[0];
    const dishes = await tx
      .select()
      .from(orderToDish)
      .where(eq(orderToDish.orderId, orderId));
    const leftToCook =
      dishes.length -
      dishes.filter(
        (x) =>
          x.status === DISH_IN_ORDER_STATUSES.COOKED ||
          x.status == DISH_IN_ORDER_STATUSES.DELIVERED
      )?.length;

    if (leftToCook - 1 === 0 && theOrder?.status === ORDER_STATUSES.COOKING) {
      await tx.update(order).set({
        status: ORDER_STATUSES.COOKED,
        cookedDate: new Date(),
      });
    }

    await tx
      .update(orderToDish)
      .set({
        status: DISH_IN_ORDER_STATUSES.COOKED,
        cookedDate: new Date(),
      })
      .where(eq(orderToDish.id, dishIdInOrder));
  });

  return shallowOrdersAdapter(
    await db
      .select()
      .from(order)
      .where(eq(order.id, orderId))
      .leftJoin(employee, eq(employee.id, order.employeeId))
      .leftJoin(client, eq(client.id, order.clientId))
  )[0];
}

export async function getOrdersShallow(params: IGetOrder) {
  const data = await db
    .select()
    .from(order)
    .where(makeWhereFilter(params))
    .leftJoin(employee, eq(employee.id, order.employeeId))
    .leftJoin(client, eq(client.id, order.clientId));

  return shallowOrdersAdapter(data);
}
