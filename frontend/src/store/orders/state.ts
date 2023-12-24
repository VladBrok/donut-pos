import { IOrder, IShallowOrder } from "donut-shared/src/actions/orders";

export interface IOrdersState {
  totalOrders: number;
  ordersPage: IOrder[];
  ordersForKitchen: IOrder[];
  cookedOrders: IShallowOrder[];
  order: IOrder | null;
}

const state: IOrdersState = {
  totalOrders: 0,
  ordersPage: [],
  ordersForKitchen: [],
  cookedOrders: [],
  order: null,
};

export default state;
