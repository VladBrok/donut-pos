import { asc, eq, ilike } from "drizzle-orm";
import { dishCategory } from "../../../../migrations/schema.js";
import { generateUuid } from "../../uuid.js";
import { db } from "../index.js";
import { DishCategoryModel } from "../models.js";
import { dishCategoryAdapter } from "../schema-to-model-adapters.js";

export async function getAllDishCategories(): Promise<DishCategoryModel[]> {
  const data = await db
    .select()
    .from(dishCategory)
    .orderBy(asc(dishCategory.name));

  return dishCategoryAdapter(data);
}

export async function getDishCategoryByName(name: string) {
  const category = (
    await db
      .select()
      .from(dishCategory)
      .where(ilike(dishCategory.name, name.trim()))
  )[0];

  if (!category) {
    return null;
  }

  return category;
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
