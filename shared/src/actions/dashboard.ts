import { IOrder } from "src/actions/orders.js";
import { OrderType } from "src/constants/order-types.js";
import { createAction } from "./index.js";

export interface IAdminDashboardData {
  orderTypes: {
    type: OrderType;
    count: number;
  }[];
  orderCount: number;
  clientCount: number;
}

export const adminDashboardLoadedAction = createAction<{
  data: IAdminDashboardData;
}>("dashboard/loaded");

export const updateAdminDashboardOrderCreated = createAction<{
  order: IOrder;
}>("dashboard/orderCreated");
