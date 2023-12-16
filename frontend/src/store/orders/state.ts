import { ordersPageLoadedAction } from "donut-shared/src/actions/orders";

export interface IOrdersState {
  totalOrders: number;
  ordersPage: ReturnType<
    typeof ordersPageLoadedAction
  >["payload"]["ordersPage"];
}

const state: IOrdersState = {
  totalOrders: 0,
  ordersPage: [],
};

export default state;
