import { ISalePoint } from "donut-shared";
import { Param, eq, sql } from "drizzle-orm";
import {
  address,
  modification,
  salePoint,
} from "../../../migrations/schema.js";
import { generateUuid } from "../../lib/uuid.js";
import { db } from "../index.js";
import { salePointsAdapter } from "../schema-to-model-adapters.js";

export async function getAllSalePoints(id?: string): Promise<ISalePoint[]> {
  const data = await db
    .select()
    .from(salePoint)
    .leftJoin(address, eq(address.id, salePoint.addressId))
    .where(id ? eq(salePoint.id, id) : undefined);

  return salePointsAdapter(data);
}

export async function deleteSalePoint(id: string) {
  return await db.delete(salePoint).where(eq(salePoint.id, id));
}

export async function createSalePoint(data: ISalePoint) {
  const toCreate = { ...data, id: generateUuid() };

  await db.transaction(async (tx) => {
    const newAddress = { ...data.address, id: generateUuid() };
    await tx.insert(address).values(newAddress);
    await tx.insert(salePoint).values({
      ...toCreate,
      workSchedule: sql`${new Param(toCreate.workSchedule)}`,
      addressId: newAddress.id,
    });
  });

  return (await getAllSalePoints(toCreate.id))[0];
}

export async function updateSalePoint(data: ISalePoint) {
  await db
    .update(modification)
    .set({
      ...data,
    })
    .where(eq(modification.id, data.id || ""));
  return data;
}
