import { ICurrentOrder } from "donut-shared";
import { ORDER_STATUSES } from "donut-shared/src/constants.js";
import { eq } from "drizzle-orm";
import {
  order,
  orderStatus,
  orderToDish,
  orderToDishToModification,
  orderToOrderStatus,
} from "migrations/schema.js";
import { generateOrderNumber } from "src/lib/generate-order-number.js";
import { generateUuid } from "../../lib/uuid.js";
import { db } from "../index.js";

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

  // TODO: select created and return it because the structure would be different (maybe...)
  return orderToCreate;
}
