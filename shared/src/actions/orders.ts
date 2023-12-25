import { ICurrentOrder } from "../actions/current-order.js";
import { DishInOrderStatus, OrderStatus } from "../constants.js";
import { createAction } from "./index.js";

export interface ICookedDish {
  order: IShallowOrder;
  dish: Omit<IDishInOrder, "modifications">;
}

export interface IDishInOrder {
  id: string;
  dishIdInOrder: string;
  count: number;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  weight: number;
  isActive: boolean;
  status: DishInOrderStatus;
  cookingDate: string;
  cookedDate: string;
  deliveredDate: string;
  modifications: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    weight: number;
    count: number;
  }[];
}

export interface IOrder {
  id: string;
  comment: string;
  tableNumber: string;
  orderNumber: string;
  status: OrderStatus;
  createdDate: string;
  cookingDate: string;
  cookedDate: string;
  deliveringDate: string;
  deliveredDate: string;
  paidDate: string;
  employee: {
    id: string;
    firstName: string;
    lastName: string;
  } | null;
  client: {
    id: string;
  } | null;
  dishes: IDishInOrder[];
}

export interface IShallowOrder {
  id: string;
  comment: string;
  tableNumber: string;
  orderNumber: string;
  status: OrderStatus;
  createdDate: string;
  cookingDate: string;
  cookedDate: string;
  deliveringDate: string;
  deliveredDate: string;
  paidDate: string;
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
  employeeId: string;
  orderId: string;
  orderNumber: string;
  dishIdInOrder: string;
}>("orders/startCookingDish");

export const dishStartedCookingAction = createAction<{
  employeeId: string;
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
  cookedDish: ICookedDish;
}>("orders/dishFinishedCooking");

export const startDeliveredDishAction = createAction<{
  orderId: string;
  orderNumber: string;
  dishIdInOrder: string;
  employeeId: string;
}>("orders/startDeliveringDish");

export const dishDeliveredAction = createAction<{
  dishIdInOrder: string;
  order: IShallowOrder;
}>("orders/dishDelivered");

export const cookedDishesLoadedAction = createAction<{
  dishes: ICookedDish[];
}>("orders/cookedDishesLoaded");
