import { db } from "../index.js";

import { IClient } from "donut-shared";
import { and, desc, eq, ilike, or, sql } from "drizzle-orm";
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

export async function findClientByPhone(phone: string) {
  const data = await db
    .select()
    .from(client)
    .where(eq(client.phone, phone))
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

export interface IGetClientsPage {
  page: number;
  perPage: number;
  search?: string;
}

export async function getClientsPage(params: IGetClientsPage) {
  const clients = db
    .select()
    .from(client)
    .orderBy(desc(client.registeredAt))
    .where(makeWhereFilter(params))
    .offset((params.page - 1) * params.perPage)
    .limit(params.perPage)
    .as("client");

  const data = await db
    .select()
    .from(clients)
    .leftJoin(address, eq(address.id, client.addressId))
    .orderBy(desc(client.registeredAt));

  const total = await db
    .select({
      value: sql`count('*')`.mapWith(Number),
    })
    .from(client)
    .where(makeWhereFilter(params));

  return { clientsPage: clientAdapter(data), total: total?.[0].value || 0 };
}

// TODO: also search an address + also display an address on client ? (plus the client might need to have many addresses...)
function makeWhereFilter(params: IGetClientsPage) {
  return and(
    params.search
      ? or(
          ilike(client.firstName, `%${params.search}%`),
          ilike(client.lastName, `%${params.search}%`),
          ilike(client.email, `%${params.search}%`),
          ilike(client.phone, `%${params.search}%`)
        )
      : undefined
  );
}
