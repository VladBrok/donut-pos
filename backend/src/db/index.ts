import "dotenv/config";
import { DefaultLogger, sql } from "drizzle-orm";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { DbLogWriter } from "./log-writer.js";

export let db = null as unknown as PostgresJsDatabase<Record<string, never>>;

export async function connect() {
  const connectionString = process.env.DATABASE_URL || "";
  const client = postgres(connectionString);
  const logger = new DefaultLogger({ writer: new DbLogWriter() });
  db = drizzle(client, { logger });
  await db.execute(sql`SET TIME ZONE 'UTC';`);
}
