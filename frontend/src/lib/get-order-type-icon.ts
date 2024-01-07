import { OrderType } from "donut-shared";

export function getOrderTypeIcon(orderType: OrderType): string {
  return orderType === "delivery"
    ? "o_directions_car"
    : orderType === "dine-in"
    ? "o_restaurant"
    : orderType === "takeout"
    ? "o_local_mall"
    : "";
}
