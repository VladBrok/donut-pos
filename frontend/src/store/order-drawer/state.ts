import { ordersPageLoadedAction } from "donut-shared/src/actions/orders";

export interface IOrderDrawerState {
  order:
    | ReturnType<typeof ordersPageLoadedAction>["payload"]["ordersPage"][number]
    | null;
  isCurrentOrderOpen: boolean;
}

const state: IOrderDrawerState = {
  order: null,
  isCurrentOrderOpen: false,
};

export default state;
