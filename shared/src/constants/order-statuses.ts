export const ORDER_STATUSES = {
  CREATED: "created",
  COOKING: "cooking",
  COOKED: "cooked",
  DELIVERING: "delivering",
  DELIVERED: "delivered",
  PAID: "paid",
} as const;
export const ORDER_STATUSES_ARR = Object.values(ORDER_STATUSES);
export type OrderStatus = (typeof ORDER_STATUSES)[keyof typeof ORDER_STATUSES];
