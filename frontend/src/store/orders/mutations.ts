import {
  IOrder,
  dishFinishedCookingAction,
  dishStartedCookingAction,
  orderCreatedAction,
  orderLoadedAction,
  ordersForKitchenLoadedAction,
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

  ordersForKitchenLoaded(
    state: IOrdersState,
    action: ReturnType<typeof ordersForKitchenLoadedAction>
  ) {
    state.ordersForKitchen = sortDishesByCookingStatus(action.payload.orders);
  },

  created(state: IOrdersState, action: ReturnType<typeof orderCreatedAction>) {
    state.ordersForKitchen.push(action.payload.order);
  },

  dishStartedCooking(
    state: IOrdersState,
    action: ReturnType<typeof dishStartedCookingAction>
  ) {
    const order = state.ordersForKitchen.find(
      (x) => x.orderNumber === action.payload.orderNumber
    );
    const dish = order?.dishes.find(
      (x) => x.dishIdInOrder === action.payload.dishIdInOrder
    );
    if (dish) {
      dish.isCooking = true;
      state.ordersForKitchen = sortDishesByCookingStatus(
        state.ordersForKitchen
      );
    }
  },

  dishFinishedCooking(
    state: IOrdersState,
    action: ReturnType<typeof dishFinishedCookingAction>
  ) {
    const order = state.ordersForKitchen.find(
      (x) => x.orderNumber === action.payload.orderNumber
    );
    const dish = order?.dishes.find(
      (x) => x.dishIdInOrder === action.payload.dishIdInOrder
    );
    if (dish) {
      dish.isReady = true;
      if (order?.dishes.every((x) => x.isReady)) {
        state.ordersForKitchen.splice(state.ordersForKitchen.indexOf(order), 1);
      }
      state.ordersForKitchen = sortDishesByCookingStatus(
        state.ordersForKitchen
      );
    }
  },
};

export default mutation;
