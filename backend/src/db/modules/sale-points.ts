import { ISalePoint } from "donut-shared";
import { Param, eq, sql } from "drizzle-orm";
import { address, salePoint } from "../../../migrations/schema.js";
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
  const theSalePoint = (await getAllSalePoints(data.id))[0];

  await db.transaction(async (tx) => {
    const newAddressId = generateUuid();
    const addressId =
      theSalePoint.address.id === data.address.id
        ? data.address.id
        : newAddressId;
    if (theSalePoint.address.id !== data.address.id) {
      await tx.insert(address).values({
        ...data.address,
        id: newAddressId,
      });
    }

    const toUpdate: Partial<ISalePoint> = structuredClone(data);
    delete toUpdate.address;
    await tx
      .update(salePoint)
      .set({
        ...toUpdate,
        workSchedule: sql`${new Param(data.workSchedule)}`,
        addressId: addressId,
      })
      .where(eq(salePoint.id, data.id || ""));
  });

  return (await getAllSalePoints(data.id))[0];
}
