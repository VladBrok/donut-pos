import { IOrder } from "donut-shared/src/actions/orders";

export interface IOrdersState {
  totalOrders: number;
  ordersPage: IOrder[];
  order: IOrder | null;
}

const state: IOrdersState = {
  totalOrders: 0,
  ordersPage: [],
  order: null,
};

export default state;
