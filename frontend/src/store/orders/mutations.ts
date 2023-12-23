import {
  createdOrdersLoadedAction,
  orderCreatedAction,
  orderLoadedAction,
  ordersPageLoadedAction,
} from "donut-shared/src/actions/orders";
import { MutationTree } from "vuex";
import { IOrdersState } from "./state";

const mutation: MutationTree<IOrdersState> = {
  pageLoaded(
    state: IOrdersState,
    action: ReturnType<typeof ordersPageLoadedAction>
  ) {
    state.totalOrders = action.payload.totalOrders;
    state.ordersPage = action.payload.ordersPage;
  },

  orderLoaded(
    state: IOrdersState,
    action: ReturnType<typeof orderLoadedAction>
  ) {
    state.order = action.payload.order;
  },

  createdOrdersLoaded(
    state: IOrdersState,
    action: ReturnType<typeof createdOrdersLoadedAction>
  ) {
    state.createdOrders = action.payload.createdOrders;
  },

  created(state: IOrdersState, action: ReturnType<typeof orderCreatedAction>) {
    state.createdOrders.push(action.payload.order);
  },
};

export default mutation;
