import { IOrder } from "donut-shared/src/actions/orders";

export interface IOrderDrawerState {
  order: IOrder | null;
  isCurrentOrderOpen: boolean;
}

const state: IOrderDrawerState = {
  order: null,
  isCurrentOrderOpen: false,
};

export default state;
