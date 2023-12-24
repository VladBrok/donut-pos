import {
  IOrder,
  cookedDishesLoadedAction,
  dishDeliveredAction,
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
      .sort((a, b) =>
        a.status === "cooked" || a.status === "delivered"
          ? 1
          : b.status === "cooked" || b.status === "delivered"
          ? -1
          : 0
      ),
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
      dish.status = "cooking";
      dish.cookingDate = new Date().toISOString();
      state.ordersForKitchen = sortDishesByCookingStatus(
        state.ordersForKitchen
      );
    }
  },

  dishFinishedCooking(
    state: IOrdersState,
    action: ReturnType<typeof dishFinishedCookingAction>
  ) {
    state.cookedDishes.push(action.payload.cookedDish);

    const order = state.ordersForKitchen.find(
      (x) => x.orderNumber === action.payload.cookedDish.order.orderNumber
    );
    const dish = order?.dishes.find(
      (x) => x.dishIdInOrder === action.payload.cookedDish.dish.dishIdInOrder
    );

    if (!dish) {
      return;
    }

    dish.status = "cooked";
    dish.cookedDate = new Date().toISOString();
    // TODO: extract code for working with dish-in-order statuses and use it on BE and FE (I already wrote similar TODO in some other component)
    const orderIsCooked = order?.dishes.every(
      (x) => x.status === "cooked" || x.status === "delivered"
    );
    if (orderIsCooked && order) {
      state.ordersForKitchen.splice(state.ordersForKitchen.indexOf(order), 1);
    }

    state.ordersForKitchen = sortDishesByCookingStatus(state.ordersForKitchen);
  },

  cookedDishesLoaded(
    state: IOrdersState,
    action: ReturnType<typeof cookedDishesLoadedAction>
  ) {
    state.cookedDishes = action.payload.dishes;
  },

  dishDelivered(
    state: IOrdersState,
    action: ReturnType<typeof dishDeliveredAction>
  ) {
    const idxOf = state.cookedDishes.findIndex(
      (x) => x.order.id === action.payload.orderId
    );
    if (idxOf > -1) {
      state.cookedDishes.splice(idxOf, 1);
    }
  },
};

export default mutation;
