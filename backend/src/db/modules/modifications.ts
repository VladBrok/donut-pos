import { eq, ilike } from "drizzle-orm";
import { modification } from "../../../migrations/schema.js";
import { generateUuid } from "../../lib/uuid.js";
import { db } from "../index.js";
import { ModificationModel } from "../models.js";
import { modificationAdapter } from "../schema-to-model-adapters.js";

export async function getAllModifications(): Promise<ModificationModel[]> {
  const data = await db.select().from(modification);

  return modificationAdapter(data);
}

export async function getModificationByName(name: string) {
  const found = (
    await db
      .select()
      .from(modification)
      .where(ilike(modification.name, name.trim()))
  )[0];

  if (!found) {
    return null;
  }

  return found;
}

export async function deleteModification(id: string) {
  return await db.delete(modification).where(eq(modification.id, id));
}

export async function createModification(data: Omit<ModificationModel, "id">) {
  const toCreate = { id: generateUuid(), ...data };
  await db.insert(modification).values({
    ...toCreate,
    weight: toCreate.weight,
    price: toCreate.price,
  });
  return toCreate;
}

export async function updateModification(data: Partial<ModificationModel>) {
  await db
    .update(modification)
    .set({
      ...data,
      weight: data.weight,
      price: data.price,
    })
    .where(eq(modification.id, data.id || ""));
  return data;
}
