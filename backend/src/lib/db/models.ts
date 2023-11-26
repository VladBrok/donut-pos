import { loadModificationsAction } from "donut-shared";
import { loginAction } from "donut-shared/src/actions/auth.js";
import { loadDishCategoriesAction } from "donut-shared/src/actions/dish-categories.js";
import { loadDishesAction } from "donut-shared/src/actions/dishes.js";

export interface EmployeeModel {
  id: string;
  phone: string;
  passwordHash: string;
  permissions: ReturnType<typeof loginAction>["payload"]["permissions"];
}

export type DishCategoryModel = ReturnType<
  typeof loadDishCategoriesAction
>["payload"]["categories"][number];

export type DishModel = ReturnType<
  typeof loadDishesAction
>["payload"]["dishes"][number];

export type ModificationModel = ReturnType<
  typeof loadModificationsAction
>["payload"]["modifications"][number];
