import { ORDER_TYPES, OrderType } from "donut-shared";

export function getOrderTypeIcon(orderType: OrderType): string {
  return orderType === ORDER_TYPES.DELIVERY
    ? "o_directions_car"
    : orderType === ORDER_TYPES.DINE_IN
    ? "o_restaurant"
    : orderType === ORDER_TYPES.TAKEOUT
    ? "o_local_mall"
    : "";
}
