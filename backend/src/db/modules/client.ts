import { db } from "../index.js";

import { eq } from "drizzle-orm";
import { clientAdapter } from "src/db/schema-to-model-adapters.js";
import { address, client } from "../../../migrations/schema.js";

export async function findClientByEmail(email: string) {
  const data = await db
    .select()
    .from(client)
    .where(eq(client.email, email))
    .leftJoin(address, eq(address.id, client.addressId));

  return clientAdapter(data)?.[0];
}
