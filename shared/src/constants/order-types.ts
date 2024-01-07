export const ORDER_TYPES = {
  DINE_IN: "dine-in",
  DELIVERY: "delivery",
  TAKEOUT: "takeout",
} as const;
export const ORDER_TYPES_ARR = Object.values(ORDER_TYPES);
export type OrderType = (typeof ORDER_TYPES)[keyof typeof ORDER_TYPES];
