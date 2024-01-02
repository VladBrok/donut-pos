import { db } from "../index.js";

import { IClient } from "donut-shared";
import { eq } from "drizzle-orm";
import { clientAdapter } from "src/db/schema-to-model-adapters.js";
import { generateUuid } from "src/lib/uuid.js";
import { address, client } from "../../../migrations/schema.js";

export async function findClientByEmail(email: string) {
  const data = await db
    .select()
    .from(client)
    .where(eq(client.email, email))
    .leftJoin(address, eq(address.id, client.addressId));

  return clientAdapter(data)?.[0];
}

export async function createClient(data: Omit<IClient, "id">) {
  const toCreate = { id: generateUuid(), ...data };
  await db.insert(client).values({
    ...toCreate,
    registeredAt: new Date(data.registeredAt),
  });
  return toCreate;
}
