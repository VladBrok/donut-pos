import { loadModificationsAction, loadRolesAction } from "donut-shared";
import { loginAction } from "donut-shared/src/actions/auth.js";
import { loadDishCategoriesAction } from "donut-shared/src/actions/dish-categories.js";
import { loadDishesAction } from "donut-shared/src/actions/dishes.js";
import { ordersPageLoadedAction } from "donut-shared/src/actions/orders.js";

export interface EmployeeModel {
  id: string;
  phone: string;
  isPhoneVerified: boolean;
  registeredAt: string;
  firstName: string;
  lastName: string;
  passwordHash?: string;
  role: ReturnType<typeof loadRolesAction>["payload"]["roles"][number];
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

export type RoleModel = ReturnType<
  typeof loadRolesAction
>["payload"]["roles"][number];

export type OrderModel = ReturnType<
  typeof ordersPageLoadedAction
>["payload"]["ordersPage"][number];
