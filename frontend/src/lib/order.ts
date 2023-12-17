import { OrderStatus } from "donut-shared/src/constants";
import { sortByDate } from "src/lib/date";
import { IOrdersState } from "src/store/orders/state";

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

export function getOrderTotalCost(dishes: IDish[]): number {
  return dishes.reduce((sum, cur) => sum + getOrderDishTotalCost(cur), 0) || 0;
}
export function getOrderCurrentStatus(
  order: IOrdersState["ordersPage"][number]
): OrderStatus {
  return sortByDate(order.statuses, (status) => status.date).at(-1)?.codeName;
}
