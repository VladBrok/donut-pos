import { db } from "../index.js";

import { eq } from "drizzle-orm";
import {
  dish,
  dishCategory,
  dishToModification,
  modification,
} from "../../../migrations/schema.js";
import { generateUuid } from "../../lib/uuid.js";
import { DishModel } from "../models.js";
import { dishAdapter } from "../schema-to-model-adapters.js";

export async function getAllDishes(): Promise<DishModel[]> {
  const data = await db
    .select()
    .from(dish)
    .leftJoin(dishCategory, eq(dish.categoryId, dishCategory.id))
    .leftJoin(dishToModification, eq(dishToModification.dishId, dish.id))
    .leftJoin(
      modification,
      eq(modification.id, dishToModification.modificationId)
    );

  return dishAdapter(data);
}

export async function deleteDish(id: string) {
  return await db.delete(dish).where(eq(dish.id, id));
}

export async function createDish(data: Omit<DishModel, "id">) {
  const toCreate = { id: generateUuid(), ...data };
  await db.transaction(async (tx) => {
    await tx.insert(dish).values({
      ...toCreate,
      weight: toCreate.weight,
      price: toCreate.price,
      categoryId: data.category?.id,
    });

    if (toCreate.modifications.length) {
      await tx.insert(dishToModification).values(
        toCreate.modifications.map<typeof dishToModification.$inferInsert>(
          (x) => ({
            id: generateUuid(),
            dishId: toCreate.id,
            modificationId: x.id,
          })
        )
      );
    }
  });
  return toCreate;
}

export async function updateDish(
  data: Partial<DishModel> & { categoryId: string }
) {
  const dataWithoutModifications = structuredClone(data);
  delete dataWithoutModifications.modifications;

  await db.transaction(async (tx) => {
    await tx
      .update(dish)
      .set({
        ...dataWithoutModifications,
        weight: data.weight,
        price: data.price,
      })
      .where(eq(dish.id, data.id || ""));

    await tx
      .delete(dishToModification)
      .where(eq(dishToModification.dishId, data.id || ""));

    if (data.modifications?.length) {
      await tx.insert(dishToModification).values(
        data.modifications.map<typeof dishToModification.$inferInsert>((x) => ({
          id: generateUuid(),
          dishId: data.id,
          modificationId: x.id,
        }))
      );
    }
  });

  return data;
}
