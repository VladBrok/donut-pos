import { DefaultLogger, asc, eq } from "drizzle-orm";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { dishCategory, employee, role } from "../../../migrations/schema.js";
import { generateUuid } from "../uuid.js";
import { DbLogWriter } from "./log-writer.js";
import { DishCategoryModel, EmployeeModel } from "./models.js";
import {
  dishCategoryAdapter,
  employeeAdapter,
} from "./schema-to-model-adapters.js";

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

export async function getAllDishCategories(): Promise<DishCategoryModel[]> {
  const data = await db
    .select()
    .from(dishCategory)
    .orderBy(asc(dishCategory.name));

  return dishCategoryAdapter(data);
}

export async function deleteDishCategory(id: string) {
  return await db.delete(dishCategory).where(eq(dishCategory.id, id));
}

export async function createDishCategory(data: Omit<DishCategoryModel, "id">) {
  const toCreate = { id: generateUuid(), ...data };
  await db.insert(dishCategory).values(toCreate);
  return toCreate;
}

export async function updateDishCategory(data: Partial<DishCategoryModel>) {
  await db
    .update(dishCategory)
    .set(data)
    .where(eq(dishCategory.id, data?.id || ""));
  return data;
}
