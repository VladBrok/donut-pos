import { IDiningTable } from "donut-shared/src/actions/current-order.js";
import { eq, ilike } from "drizzle-orm";
import { diningTable, employee } from "../../../migrations/schema.js";
import { generateUuid } from "../../lib/uuid.js";
import { db } from "../index.js";
import { diningTableAdapter } from "../schema-to-model-adapters.js";

export async function getAllDiningTables(): Promise<IDiningTable[]> {
  const data = await db
    .select()
    .from(diningTable)
    .leftJoin(employee, eq(employee.id, diningTable.employeeId));

  return diningTableAdapter(data);
}

export async function getDiningTableByNumber(tableNumber: string) {
  const table = (
    await db
      .select()
      .from(diningTable)
      .where(ilike(diningTable.number, tableNumber.trim()))
  )[0];

  if (!table) {
    return null;
  }

  return table;
}

export async function deleteDiningTable(id: string) {
  return await db.delete(diningTable).where(eq(diningTable.id, id));
}

export async function createDiningTable(data: Omit<IDiningTable, "id">) {
  const toCreate = { id: generateUuid(), ...data };
  const clone = structuredClone(toCreate);
  // @ts-ignore
  delete toCreate.employee;
  await db.insert(diningTable).values({
    ...toCreate,
    employeeId: clone.employee.id,
  });
  return clone;
}

export async function updateDiningTable(data: Partial<IDiningTable>) {
  const employeeId = data.employee?.id || "";
  delete data.employee;
  await db
    .update(diningTable)
    .set({
      ...data,
      employeeId: employeeId,
    })
    .where(eq(diningTable.id, data?.id || ""));
  return data;
}
