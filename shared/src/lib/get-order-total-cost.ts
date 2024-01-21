import { IOrder } from "src/actions/orders.js";
import { DELIVERY_COST } from "../constants/misc.js";

interface IDish {
  price: number;
  count: number;
  modifications: { price: number; count: number }[];
}

export function getOrderDishTotalCost(dish: IDish): number {
  return (
    (dish.price +
      dish.modifications.reduce((sum, cur) => sum + cur.price * cur.count, 0)) *
    dish.count
  );
}

export function getDishesTotalCost(order: IOrder): number {
  return (
    order.dishes.reduce((sum, cur) => sum + getOrderDishTotalCost(cur), 0) || 0
  );
}

export function getOrderTotalCost(order: IOrder): number {
  return (
    getDishesTotalCost(order) + (order.type === "delivery" ? DELIVERY_COST : 0)
  );
}
