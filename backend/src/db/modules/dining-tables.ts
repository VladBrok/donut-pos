import { eq, ilike } from "drizzle-orm";
import { diningTable } from "../../../migrations/schema.js";
import { generateUuid } from "../../lib/uuid.js";
import { db } from "../index.js";
import { DiningTableModel } from "../models.js";
import { diningTableAdapter } from "../schema-to-model-adapters.js";

export async function getAllDiningTables(): Promise<DiningTableModel[]> {
  const data = await db.select().from(diningTable);

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

export async function createDiningTable(data: Omit<DiningTableModel, "id">) {
  const toCreate = { id: generateUuid(), ...data };
  await db.insert(diningTable).values(toCreate);
  return toCreate;
}

export async function updateDiningTable(data: Partial<DiningTableModel>) {
  await db
    .update(diningTable)
    .set(data)
    .where(eq(diningTable.id, data?.id || ""));
  return data;
}
