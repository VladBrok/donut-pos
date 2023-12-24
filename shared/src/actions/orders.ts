import { ICurrentOrder } from "src/actions/current-order.js";
import { OrderStatus } from "src/constants.js";
import { createAction } from "./index.js";

export interface IOrder {
  id: string;
  comment: string;
  tableNumber: string;
  orderNumber: string;
  employee: {
    id: string;
    firstName: string;
    lastName: string;
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
    orderNumber: string;
    dishIdInOrder: string;
    count: number;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    weight: number;
    isActive: boolean;
    isCooking: boolean;
    isReady: boolean;
    modifications: {
      id: string;
      name: string;
      imageUrl: string;
      price: number;
      weight: number;
      count: number;
    }[];
  }[];
}

export interface IShallowOrder {
  id: string;
  comment: string;
  tableNumber: string;
  orderNumber: string;
  employee: {
    id: string;
    firstName: string;
    lastName: string;
  } | null;
  client: {
    id: string;
  } | null;
}

export const orderLoadedAction = createAction<{
  order: IOrder | null;
}>("orders/orderLoaded");

export const loadOrdersPageAction = createAction<{
  page: number;
  status?: OrderStatus;
  orderNumber?: string;
}>("orders/loadPage");

export const ordersPageLoadedAction = createAction<{
  totalOrders: number;
  ordersPage: IOrder[];
}>("orders/pageLoaded");

export const ordersForKitchenLoadedAction = createAction<{
  orders: IOrder[];
}>("orders/ordersForKitchenLoaded");

export const createOrderAction = createAction<{
  order: ICurrentOrder;
}>("orders/create");

export const orderCreatedAction = createAction<{
  order: IOrder;
}>("orders/created");

export const startCookingDishAction = createAction<{
  orderId: string;
  orderNumber: string;
  dishIdInOrder: string;
}>("orders/startCookingDish");

export const dishStartedCookingAction = createAction<{
  orderId: string;
  orderNumber: string;
  dishIdInOrder: string;
}>("orders/dishStartedCooking");

export const finishCookingDishAction = createAction<{
  orderId: string;
  orderNumber: string;
  dishIdInOrder: string;
}>("orders/finishCookingDish");

export const dishFinishedCookingAction = createAction<{
  orderId: string;
  orderNumber: string;
  dishIdInOrder: string;
  order: IShallowOrder;
  isOrderCooked: boolean;
}>("orders/dishFinishedCooking");

export const cookedOrdersOfEmployeeLoadedAction = createAction<{
  orders: IShallowOrder[];
}>("orders/cookedOrdersOfEmployeeLoaded");
