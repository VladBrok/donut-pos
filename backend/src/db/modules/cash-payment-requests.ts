import { ICashPaymentRequest, getOrderTotalCost } from "donut-shared";
import { and, eq } from "drizzle-orm";
import { cashPaymentRequest, diningTable, order } from "migrations/schema.js";
import { getSingleOrder } from "src/db/modules/orders.js";
import { cashPaymentRequestsAdapter } from "src/db/schema-to-model-adapters.js";
import { generateUuid } from "src/lib/uuid.js";
import { db } from "../index.js";

// TODO: maybe add request time so that i can sort by it and return most recent last AND display request time in notification
export async function getCashPaymentRequests(employeeId?: string, id?: string) {
  const data = await db
    .select()
    .from(cashPaymentRequest)
    .leftJoin(order, eq(order.id, cashPaymentRequest.orderId))
    .leftJoin(diningTable, eq(diningTable.id, order.diningTableId))
    .where(
      and(
        employeeId ? eq(order.employeeId, employeeId) : undefined,
        id ? eq(cashPaymentRequest.id, id) : undefined
      )
    );

  return cashPaymentRequestsAdapter(data);
}

export async function requestCashPayment(
  orderId: string
): Promise<ICashPaymentRequest> {
  const id = generateUuid();
  const order = await getSingleOrder(undefined, undefined, orderId);
  const totalCost = getOrderTotalCost(order);

  await db.insert(cashPaymentRequest).values({
    id: id,
    orderId: orderId,
    totalCost: totalCost,
  });

  return (await getCashPaymentRequests(undefined, id))[0];
}

export async function deleteCashPaymentRequest(id: string) {
  const data = (
    await db
      .select()
      .from(cashPaymentRequest)
      .where(eq(cashPaymentRequest.id, id))
      .leftJoin(order, eq(order.id, cashPaymentRequest.orderId))
  )[0];

  await db.delete(cashPaymentRequest).where(eq(cashPaymentRequest.id, id));

  return {
    employeeId: data?.order?.employeeId || "",
  };
}
