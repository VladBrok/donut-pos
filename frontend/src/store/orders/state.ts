import { ICookedDish, IOrder } from "donut-shared/src/actions/orders";

export interface IOrdersState {
  totalOrders: number;
  ordersPage: IOrder[];
  ordersForKitchen: IOrder[];
  cookedDishes: ICookedDish[];
  order: IOrder | null;
  paymentLink?: string;
  createOrderAfterLogin?: boolean;
}

const state: IOrdersState = {
  totalOrders: 0,
  ordersPage: [],
  ordersForKitchen: [],
  cookedDishes: [],
  order: null,
};

export default state;
