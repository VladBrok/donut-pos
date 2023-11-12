import { DefaultLogger, eq } from "drizzle-orm";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { employee, role } from "../../../migrations/schema.js";
import { DbLogWriter } from "./log-writer.js";
import { EmployeeModel } from "./models.js";
import { employeeAdapter } from "./schema-to-model-adapters.js";

let db = null as unknown as PostgresJsDatabase<Record<string, never>>;

export async function connect() {
  const connectionString = process.env.DATABASE_URL || "";
  const client = postgres(connectionString);
  const logger = new DefaultLogger({ writer: new DbLogWriter() });
  db = drizzle(client, { logger });
}

export async function findEmployeeByPhone(phone: string) {
  const data = (
    await db
      .select()
      .from(employee)
      .where(eq(employee.phone, phone))
      .leftJoin(role, eq(employee.roleId, role.id))
  )[0];

  return employeeAdapter(data);
}

export async function findEmployeeById(
  id: string
): Promise<EmployeeModel | null> {
  const data = (
    await db
      .select()
      .from(employee)
      .where(eq(employee.id, id))
      .leftJoin(role, eq(employee.roleId, role.id))
  )[0];

  return employeeAdapter(data);
}
