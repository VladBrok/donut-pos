import {
  IOrder,
  cookedDishesLoadedAction,
  dishDeliveredAction,
  dishFinishedCookingAction,
  dishStartedCookingAction,
  orderCreatedAction,
  orderLoadedAction,
  orderPaidSuccessAction,
  ordersForKitchenLoadedAction,
  ordersPageLoadedAction,
  paymentLinkReceivedAction,
  updateCreateOrderAfterAuthAction,
} from "donut-shared/src/actions/orders";
import { MutationTree } from "vuex";
import { IOrdersState } from "./state";

// TODO: the fact that I have to duplicate logic for updating order status in DB and here is frustrating. I would rather just silently update the whole order with whatever the server sent instead of updating individual props (isCooked, etc.). Think how to do that in a most effective way because it otherwise will cause a lot of bugs going forward

function sortDishesByCookingStatus(orders: IOrder[]) {
  return orders.map((order) => ({
    ...order,
    dishes: order.dishes
      .slice()
      .sort((a, b) => (a.cookedDate ? 1 : b.cookedDate ? -1 : 0)),
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
    const orderInPage = state.ordersPage.find(
      (x) => x.orderNumber === action.payload.orderNumber
    );
    if (orderInPage) {
      orderInPage.status = "cooking";
      orderInPage.cookingDate = new Date().toISOString();
    }

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
      const orderInPage = state.ordersPage.find(
        (x) => x.orderNumber === action.payload.cookedDish.order.orderNumber
      );
      if (orderInPage) {
        orderInPage.status = "cooked";
        orderInPage.cookedDate = new Date().toISOString();
      }
    }

    state.ordersForKitchen = sortDishesByCookingStatus(state.ordersForKitchen);
  },

  dishDelivered(
    state: IOrdersState,
    action: ReturnType<typeof dishDeliveredAction>
  ) {
    const orderInPage = state.ordersPage.find(
      (x) => x.orderNumber === action.payload.order.orderNumber
    );
    if (action.payload.order.status === "delivered" && orderInPage) {
      orderInPage.status = "delivered";
      orderInPage.deliveredDate = new Date().toISOString();
    }

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

  orderPaidSuccess(
    state: IOrdersState,
    action: ReturnType<typeof orderPaidSuccessAction>
  ) {
    const orderInPage = state.ordersPage.find(
      (x) => x.orderNumber === action.payload.order.orderNumber
    );
    if (orderInPage && !orderInPage.paidDate) {
      orderInPage.paidDate = new Date().toISOString();
    }

    if (state.order && !state.order.paidDate) {
      state.order.paidDate = new Date().toISOString();
    }
  },

  paymentLinkReceived(
    state: IOrdersState,
    action: ReturnType<typeof paymentLinkReceivedAction>
  ) {
    state.paymentLink = action.payload.link;
  },

  updateCreateOrderAfterAuth(
    state: IOrdersState,
    action: ReturnType<typeof updateCreateOrderAfterAuthAction>
  ) {
    state.createOrderAfterAuth = action.payload.value;
  },
};

export default mutation;
