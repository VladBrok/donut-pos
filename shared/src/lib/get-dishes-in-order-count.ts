import { ICurrentOrder } from "src/actions/current-order.js";

export function getDishesInOrderCount(order?: ICurrentOrder | null): number {
  return order?.dishes.reduce((sum, cur) => sum + cur.count, 0) || 0;
}
