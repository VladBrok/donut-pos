import { ISalePoint } from "donut-shared";
import { eq } from "drizzle-orm";
import {
  address,
  modification,
  salePoint,
} from "../../../migrations/schema.js";
import { generateUuid } from "../../lib/uuid.js";
import { db } from "../index.js";
import { salePointsAdapter } from "../schema-to-model-adapters.js";

export async function getAllSalePoints(): Promise<ISalePoint[]> {
  const data = await db
    .select()
    .from(salePoint)
    .leftJoin(address, eq(address.id, salePoint.addressId));

  return salePointsAdapter(data);
}

export async function deleteSalePoint(id: string) {
  return await db.delete(salePoint).where(eq(salePoint.id, id));
}

export async function createSalePoint(data: ISalePoint) {
  const toCreate = { ...data, id: generateUuid() };
  await db.insert(salePoint).values({
    ...toCreate,
  });
  return toCreate;
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
