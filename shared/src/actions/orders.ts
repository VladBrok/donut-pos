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

export const createdOrdersLoadedAction = createAction<{
  createdOrders: IOrder[];
}>("orders/createdOrdersLoaded");

export const createOrderAction = createAction<{
  order: ICurrentOrder;
}>("orders/create");

export const orderCreatedAction = createAction<{
  order: IOrder;
}>("orders/created");

export const startCookingDishAction = createAction<{
  orderNumber: string;
  dishIdInOrder: string;
}>("orders/startCookingDish");

// TODO: if it's a first dish in order that started cooking, update the order status to Cooking
export const dishStartedCookingAction = createAction<{
  orderNumber: string;
  dishIdInOrder: string;
}>("orders/dishStartedCooking");

export const finishCookingDishAction = createAction<{
  orderNumber: string;
  dishIdInOrder: string;
}>("orders/finishCookingDish");

// TODO: if all dishes in order are cooked, update the order status to Cooked
export const dishFinishedCookingAction = createAction<{
  orderNumber: string;
  dishIdInOrder: string;
}>("orders/dishFinishedCooking");
