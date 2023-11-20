import { db } from "../index.js";

import { asc, eq } from "drizzle-orm";
import { dish, dishCategory } from "../../../../migrations/schema.js";
import { generateUuid } from "../../uuid.js";
import { DishModel } from "../models.js";
import { dishAdapter } from "../schema-to-model-adapters.js";

export async function getAllDishes(): Promise<DishModel[]> {
  const data = await db
    .select()
    .from(dish)
    .leftJoin(dishCategory, eq(dish.categoryId, dishCategory.id))
    .orderBy(asc(dish.name));

  return dishAdapter(data);
}

export async function deleteDish(id: string) {
  return await db.delete(dish).where(eq(dish.id, id));
}

export async function createDish(data: Omit<DishModel, "id">) {
  const toCreate = { id: generateUuid(), ...data };
  await db.insert(dish).values({
    ...toCreate,
    weight: toCreate.weight.toString(),
    price: toCreate.price.toString(),
    categoryId: data.category?.id,
  });
  return toCreate;
}

export async function updateDish(
  data: Partial<DishModel> & { categoryId: string }
) {
  await db
    .update(dish)
    .set({
      ...data,
      weight: data.weight?.toString(),
      price: data.price?.toString(),
    })
    .where(eq(dish.id, data.id || ""));
  return data;
}
