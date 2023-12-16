import { ICurrentOrder } from "src/actions/current-order.js";
import { OrderStatus } from "src/constants.js";
import { createAction } from "./index.js";

export const loadOrdersPageAction = createAction<{
  page: number;
  status?: OrderStatus;
}>("orders/loadPage");

export const ordersPageLoadedAction = createAction<{
  totalOrders: number;
  ordersPage: {
    id: string;
    comment: string;
    tableNumber: string;
    orderNumber: string;
    employee: {
      id: string;
    } | null;
    client: {
      id: string;
    } | null;
    statuses: {
      id: string;
      codeName: OrderStatus;
      date: string;
    }[];
    dishes: {
      id: string;
      count: number;
      name: string;
      imageUrl: string;
      description: string;
      price: number;
      weight: number;
      isActive: boolean;
      modifications: {
        id: string;
        name: string;
        imageUrl: string;
        price: number;
        weight: number;
        count: number;
      }[];
    }[];
  }[];
}>("orders/pageLoaded");

export const createOrderAction = createAction<{
  order: ICurrentOrder;
}>("orders/create");

export const orderCreatedAction = createAction("orders/created");
