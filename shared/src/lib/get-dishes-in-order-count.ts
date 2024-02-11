import { IOrder } from "../actions/orders.js";

export function getDishesInOrderCount(order?: IOrder | null): number {
  return order?.dishes.reduce((sum, cur) => sum + cur.count, 0) || 0;
}
