import {
  ICookedDish,
  ICookedOrder,
  IOrder,
} from "donut-shared/src/actions/orders";

export interface IOrdersState {
  totalOrders: number;
  ordersPage: IOrder[];
  ordersForKitchen: IOrder[];
  ordersForCourier: IOrder[];
  cookedDishes: ICookedDish[];
  cookedOrders: ICookedOrder[];
  order: IOrder | null;
  paymentLink?: string;
  createOrderAfterAuth?: boolean;
  tableTakenByOrderNumber: string | null;
}

const state: IOrdersState = {
  totalOrders: 0,
  ordersPage: [],
  ordersForKitchen: [],
  ordersForCourier: [],
  cookedDishes: [],
  cookedOrders: [],
  order: null,
  tableTakenByOrderNumber: null,
};

export default state;
