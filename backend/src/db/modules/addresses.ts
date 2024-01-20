import { IAddress } from "donut-shared";
import { eq } from "drizzle-orm";
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
