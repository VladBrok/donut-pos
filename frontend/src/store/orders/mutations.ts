import {
  IOrder,
  createdOrdersLoadedAction,
  dishFinishedCookingAction,
  dishStartedCookingAction,
  orderCreatedAction,
  orderLoadedAction,
  ordersPageLoadedAction,
} from "donut-shared/src/actions/orders";
import { MutationTree } from "vuex";
import { IOrdersState } from "./state";

function sortDishesByCookingStatus(orders: IOrder[]) {
  return orders.map((order) => ({
    ...order,
    dishes: order.dishes
      .slice()
      .sort((a, b) => (a.isReady ? 1 : b.isReady ? -1 : 0)),
  }));
}

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
    state.createdOrders = sortDishesByCookingStatus(
      action.payload.createdOrders
    );
  },

  created(state: IOrdersState, action: ReturnType<typeof orderCreatedAction>) {
    state.createdOrders.push(action.payload.order);
  },

  dishStartedCooking(
    state: IOrdersState,
    action: ReturnType<typeof dishStartedCookingAction>
  ) {
    const order = state.createdOrders.find(
      (x) => x.orderNumber === action.payload.orderNumber
    );
    const dish = order?.dishes.find(
      (x) => x.dishIdInOrder === action.payload.dishIdInOrder
    );
    if (dish) {
      dish.isCooking = true;
      state.createdOrders = sortDishesByCookingStatus(state.createdOrders);
    }
  },

  dishFinishedCooking(
    state: IOrdersState,
    action: ReturnType<typeof dishFinishedCookingAction>
  ) {
    const order = state.createdOrders.find(
      (x) => x.orderNumber === action.payload.orderNumber
    );
    const dish = order?.dishes.find(
      (x) => x.dishIdInOrder === action.payload.dishIdInOrder
    );
    if (dish) {
      dish.isReady = true;
      state.createdOrders = sortDishesByCookingStatus(state.createdOrders);
    }
  },
};

export default mutation;
