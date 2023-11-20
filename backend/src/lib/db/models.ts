import { loadDishCategoriesAction } from "donut-shared/src/actions/dish-categories.js";
import { loadDishesAction } from "donut-shared/src/actions/dishes.js";

export interface EmployeeModel {
  id: string;
  phone: string;
  passwordHash: string;
  permissions: {
    admin?: boolean;
  };
}

export type DishCategoryModel = ReturnType<
  typeof loadDishCategoriesAction
>["payload"]["categories"][number];

export type DishModel = ReturnType<
  typeof loadDishesAction
>["payload"]["dishes"][number];
