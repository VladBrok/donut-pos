import { IAddress } from "../actions/addresses.js";
import { IDiningTable } from "../actions/current-order.js";
import { DishInOrderStatus } from "../constants/dish-in-order-statuses.js";
import { OrderStatus } from "../constants/order-statuses.js";
import { OrderType } from "../constants/order-types.js";
import { createAction } from "./index.js";

export interface ICookedOrder {
  order: IOrder;
}

export interface ICookedDish {
  order: IShallowOrder;
  dish: IDishInOrder;
}

export interface IDishInOrderModification {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  weight: number;
  count: number;
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
  modifications: IDishInOrderModification[];
}

export interface IOrder {
  id: string;
  type: OrderType;
  comment: string;
  table: IDiningTable | null;
  orderNumber: string;
  status: OrderStatus;
  createdDate: string;
  cookingDate: string;
  cookedDate: string;
  deliveringDate: string;
  deliveredDate: string;
  paidDate: string;
  address?: IAddress;
  employee: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  client: {
    id: string;
    phone: string;
    firstName: string;
    email: string;
  } | null;
  dishes: IDishInOrder[];
}

export interface IShallowOrder {
  id: string;
  type: OrderType;
  comment: string;
  table: IDiningTable;
  orderNumber: string;
  status: OrderStatus;
  createdDate: string;
  cookingDate: string;
  cookedDate: string;
  deliveringDate: string;
  deliveredDate: string;
  paidDate: string;
  address?: IAddress;
  employee: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
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
  search?: string;
  isClient?: boolean;
  completed?: boolean;
}>("orders/loadPage");

export const ordersPageLoadedAction = createAction<{
  totalOrders: number;
  ordersPage: IOrder[];
}>("orders/pageLoaded");

export const ordersForKitchenLoadedAction = createAction<{
  orders: IOrder[];
}>("orders/ordersForKitchenLoaded");

export const courierOrdersLoadedAction = createAction<{
  orders: IOrder[];
}>("orders/courierOrdersLoaded");

export const createOrderAction = createAction<{
  order: IOrder;
  isClient?: boolean;
}>("orders/create");

export const orderCreatedAction = createAction<{
  order: IOrder;
}>("orders/created");

export const startCookingDishAction = createAction<{
  employeeId: string;
  clientId: string;
  orderId: string;
  orderNumber: string;
  dishIdInOrder: string;
}>("orders/startCookingDish");

export const dishStartedCookingAction = createAction<{
  employeeId: string;
  clientId: string;
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

export const cookedOrdersLoadedAction = createAction<{
  orders: ICookedOrder[];
}>("orders/cookedOrdersLoaded");

export const markOrderAsCookedAction = createAction<{
  orderId: string;
}>("orders/markAsCooked");

export const orderCookedAction = createAction<{
  order: ICookedOrder;
}>("orders/orderCooked");

export const courierStartDeliveringOrderAction = createAction<{
  orderId: string;
}>("orders/courierStartDeliveringOrder");

export const courierStartedDeliveringOrderAction = createAction<{
  order: ICookedOrder;
}>("orders/courierStartedDeliveringOrder");

export const deliverOrderAction = createAction<{
  orderId: string;
  isEmployee?: boolean;
}>("orders/deliverOrder");

export const orderDeliveredAction = createAction<{
  order: ICookedOrder;
}>("orders/orderDelivered");

export const payForOrderAction = createAction<{
  orderNumber: string;
}>("orders/payForOrder");

export const orderPaidSuccessAction = createAction<{
  order: IShallowOrder;
}>("orders/orderPaidSuccess");

export const getPaymentLinkAction = createAction<{
  orderNumber: string;
  method: "card" | "blik";
}>("orders/getPaymentLink");

export const paymentLinkReceivedAction = createAction<{
  link: string;
}>("orders/paymentLinkReceived");

export const updateCreateOrderAfterAuthAction = createAction<{
  value: boolean;
}>("orders/updateCreateOrderAfterAuth");

export const checkTableTakenAction = createAction<{
  tableId: string;
}>("orders/checkTableTaken");

export const tableTakenCheckedAction = createAction<{
  tableId: string;
  takenByOrderNumber: string | null;
}>("orders/tableTakenChecked");
