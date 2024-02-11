import { ORDER_STATUSES } from "../constants/order-statuses.js";

export const DISH_IN_ORDER_STATUSES = {
  COOKING: "cooking",
  COOKED: "cooked",
  DELIVERED: "delivered",
} as const;
export const DISH_IN_ORDER_STATUSES_ARR = Object.values(DISH_IN_ORDER_STATUSES);
export type DishInOrderStatus =
  (typeof ORDER_STATUSES)[keyof typeof DISH_IN_ORDER_STATUSES];
