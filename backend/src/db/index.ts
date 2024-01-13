import "dotenv/config";
import { DefaultLogger, sql } from "drizzle-orm";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { DbLogWriter } from "./log-writer.js";

export let db = null as unknown as PostgresJsDatabase<Record<string, never>>;
export let dbClient = null as unknown as postgres.Sql<{}>;

export async function connect() {
  const connectionString = process.env.DATABASE_URL || "";
  dbClient = postgres(connectionString);
  const logger = new DefaultLogger({ writer: new DbLogWriter() });
  db = drizzle(dbClient, { logger });
  await db.execute(sql`SET TIME ZONE 'UTC';`);
}
