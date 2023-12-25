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

// TODO: the fact that I have to duplicate logic for updating order status in DB and here is frustrating. I would rather just silently update the whole order with whatever the server sent instead of updating individual props (isCooked, etc.). Think how to do that in a most effective way because it otherwise will cause a lot of bugs going forward

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
    if (state.order?.orderNumber === action.payload.orderNumber) {
      state.order.status = "cooking";
      state.order.cookingDate = new Date().toISOString();
    }

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

    if (dish) {
      dish.status = "cooked";
      dish.cookedDate = new Date().toISOString();
    }

    // TODO: extract code for working with dish-in-order statuses and use it on BE and FE (I already wrote similar TODO in some other component)

    if (action.payload.cookedDish.order.status === "cooked") {
      if (order) {
        state.ordersForKitchen.splice(state.ordersForKitchen.indexOf(order), 1);
      }
      if (
        state.order?.orderNumber === action.payload.cookedDish.order.orderNumber
      ) {
        state.order.status = "cooked";
        state.order.cookedDate = new Date().toISOString();
      }
    }

    state.ordersForKitchen = sortDishesByCookingStatus(state.ordersForKitchen);
  },

  dishDelivered(
    state: IOrdersState,
    action: ReturnType<typeof dishDeliveredAction>
  ) {
    // TODO: extract func for updating order status and use it on BE and FE
    if (action.payload.order.status === "delivered" && state.order) {
      state.order.status = "delivered";
      state.order.deliveredDate = new Date().toISOString();
    }

    const idxOf = state.cookedDishes.findIndex(
      (x) => x.order.id === action.payload.order.id
    );
    if (idxOf > -1) {
      state.cookedDishes.splice(idxOf, 1);
    }
  },

  cookedDishesLoaded(
    state: IOrdersState,
    action: ReturnType<typeof cookedDishesLoadedAction>
  ) {
    state.cookedDishes = action.payload.dishes;
  },
};

export default mutation;
