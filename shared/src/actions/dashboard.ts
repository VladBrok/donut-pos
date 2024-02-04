import { OrderType } from "src/constants/order-types.js";
import { createAction } from "./index.js";

export interface IAdminDashboardData {
  orderTypes: {
    type: OrderType;
    count: number;
  }[];
}

export const adminDashboardLoadedAction = createAction<{
  data: IAdminDashboardData;
}>("dashboard/loaded");
