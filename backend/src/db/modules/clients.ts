import { IClient } from "donut-shared";
import { and, desc, eq, ilike, not, or, sql } from "drizzle-orm";
import { clientAdapter } from "src/db/schema-to-model-adapters.js";
import { generateUuid } from "src/lib/uuid.js";
import { client } from "../../../migrations/schema.js";
import { db } from "../index.js";

export async function findClientByEmail(email: string) {
  const data = await db.select().from(client).where(eq(client.email, email));

  return clientAdapter(data.map((x) => ({ client: x })))?.[0];
}

export async function findClientByPhone(
  phone: string,
  ignoreAnonymous?: boolean
) {
  const data = await db
    .select()
    .from(client)
    .where(
      and(
        eq(client.phone, phone),
        ignoreAnonymous ? not(eq(client.isAnonymous, true)) : undefined
      )
    );

  return clientAdapter(data.map((x) => ({ client: x })))?.[0];
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
    .orderBy(desc(client.registeredAt));

  const total = await db
    .select({
      value: sql`count('*')`.mapWith(Number),
    })
    .from(client)
    .where(makeWhereFilter(params));

  return {
    clientsPage: clientAdapter(data.map((x) => ({ client: x }))),
    total: total?.[0].value || 0,
  };
}

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
