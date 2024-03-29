import { IAddress } from "donut-shared";
import { eq } from "drizzle-orm";
import { generateUuid } from "src/lib/uuid.js";
import { address, client } from "../../../migrations/schema.js";
import { db } from "../index.js";
import { addressAdapter } from "../schema-to-model-adapters.js";

export async function getAllAdddresses(clientId: string): Promise<IAddress[]> {
  const data = await db
    .select()
    .from(address)
    .where(eq(address.clientId, clientId))
    .leftJoin(client, eq(client.id, clientId));

  return addressAdapter(data);
}

export async function createAddress(data: IAddress): Promise<IAddress> {
  const toCreate = { ...data, id: generateUuid() };
  await db.insert(address).values({
    ...toCreate,
  });
  return toCreate;
}

export async function updateAddress(id: string, data: IAddress) {
  await db
    .update(address)
    .set({
      ...data,
      id: id,
    })
    .where(eq(address.id, id));
}

export async function deleteAddress(id: string) {
  return await db.delete(address).where(eq(address.id, id));
}
