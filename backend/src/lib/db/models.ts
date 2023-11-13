import { loadDishCategoriesAction } from "donut-shared";

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
