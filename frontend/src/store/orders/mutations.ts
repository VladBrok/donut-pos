import { ORDER_STATUSES, ORDER_TYPES } from "donut-shared";
import {
  IOrder,
  cookedDishesLoadedAction,
  cookedOrdersLoadedAction,
  courierOrdersLoadedAction,
  courierStartedDeliveringOrderAction,
  dishDeliveredAction,
  dishFinishedCookingAction,
  dishStartedCookingAction,
  orderCookedAction,
  orderCreatedAction,
  orderDeliveredAction,
  orderLoadedAction,
  orderPaidSuccessAction,
  ordersForKitchenLoadedAction,
  ordersPageLoadedAction,
  paymentLinkReceivedAction,
  tableTakenCheckedAction,
  updateCreateOrderAfterAuthAction,
} from "donut-shared/src/actions/orders";
import { MutationTree } from "vuex";
import { IOrdersState } from "./state";

// TODO: the fact that I have to duplicate logic for updating order status in DB and here is frustrating. I would rather just silently update the whole order with whatever the server sent instead of updating individual props (isCooked, etc.). Think how to do that in a most effective way because it otherwise will cause a lot of bugs going forward
// ON THE OTHER HAND, I receive only small amount of data needed to mutate the state. And if I were to send the whole lists and pages of data it would be bad for bandwidth...

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

  courierOrdersLoaded(
    state: IOrdersState,
    action: ReturnType<typeof courierOrdersLoadedAction>
  ) {
    state.ordersForCourier = action.payload.orders;
  },

  courierStartedDeliveringOrder(
    state: IOrdersState,
    action: ReturnType<typeof courierStartedDeliveringOrderAction>
  ) {
    const order = state.ordersForCourier.find(
      (x) => x.id === action.payload.order.order.id
    );
    if (order) {
      order.status = ORDER_STATUSES.DELIVERING;
      order.deliveringDate = new Date().toISOString();
      order.employee = action.payload.order.order.employee;
    }
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

  orderCooked(
    state: IOrdersState,
    action: ReturnType<typeof orderCookedAction>
  ) {
    if (action.payload.order.order.type === ORDER_TYPES.TAKEOUT) {
      state.cookedOrders.push(action.payload.order);
    }

    if (
      action.payload.order.order.type === ORDER_TYPES.DELIVERY &&
      !state.ordersForCourier.some(
        (x) => x.id === action.payload.order.order.id
      )
    ) {
      state.ordersForCourier.push(action.payload.order.order);
    }

    const order = state.ordersForKitchen.find(
      (x) => x.orderNumber === action.payload.order.order.orderNumber
    );
    if (order) {
      state.ordersForKitchen.splice(state.ordersForKitchen.indexOf(order), 1);
    }
    if (state.order?.orderNumber === action.payload.order.order.orderNumber) {
      state.order.status = "cooked";
      state.order.cookedDate = new Date().toISOString();
    }
    const orderInPage = state.ordersPage.find(
      (x) => x.orderNumber === action.payload.order.order.orderNumber
    );
    if (orderInPage) {
      orderInPage.status = "cooked";
      orderInPage.cookedDate = new Date().toISOString();
    }
  },

  dishFinishedCooking(
    state: IOrdersState,
    action: ReturnType<typeof dishFinishedCookingAction>
  ) {
    if (
      !state.cookedDishes.find(
        (x) =>
          x.dish.dishIdInOrder === action.payload.cookedDish.dish.dishIdInOrder
      )
    ) {
      const dishInSameOrderIdx = state.cookedDishes.findIndex(
        (x) =>
          x.order.orderNumber === action.payload.cookedDish.order.orderNumber
      );
      if (dishInSameOrderIdx < 0) {
        state.cookedDishes.push(action.payload.cookedDish);
      } else {
        state.cookedDishes.splice(
          dishInSameOrderIdx + 1,
          0,
          action.payload.cookedDish
        );
      }
    }

    const order = state.ordersForKitchen.find(
      (x) => x.orderNumber === action.payload.cookedDish.order.orderNumber
    );
    const dish = order?.dishes.find(
      (x) => x.dishIdInOrder === action.payload.cookedDish.dish.dishIdInOrder
    );

    if (dish && !dish.cookedDate) {
      dish.status = "cooked";
      dish.cookedDate = new Date().toISOString();
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
      (x) => x.dish.dishIdInOrder === action.payload.dishIdInOrder
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

  cookedOrdersLoaded(
    state: IOrdersState,
    action: ReturnType<typeof cookedOrdersLoadedAction>
  ) {
    state.cookedOrders = action.payload.orders;
  },

  orderDelivered(
    state: IOrdersState,
    action: ReturnType<typeof orderDeliveredAction>
  ) {
    const cookedIdx = state.cookedOrders.findIndex(
      (x) => x.order.id === action.payload.order.order.id
    );
    if (cookedIdx > -1) {
      state.cookedOrders.splice(cookedIdx, 1);
    }

    const courierIdx = state.ordersForCourier.findIndex(
      (x) => x.id === action.payload.order.order.id
    );
    if (courierIdx > -1) {
      state.ordersForCourier.splice(courierIdx, 1);
    }

    if (state.order) {
      state.order.status = "delivered";
      state.order.deliveredDate = new Date().toISOString();
    }
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

    const cooked = state.cookedOrders.find(
      (x) => x.order.id === action.payload.order.id
    );
    if (cooked) {
      cooked.order.paidDate = new Date().toISOString();
    }

    const courierOrder = state.ordersForCourier.find(
      (x) => x.id === action.payload.order.id
    );
    if (courierOrder) {
      courierOrder.paidDate = new Date().toISOString();
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

  tableTakenChecked(
    state: IOrdersState,
    action: ReturnType<typeof tableTakenCheckedAction>
  ) {
    state.tableTakenByOrderNumber = action.payload.takenByOrderNumber;
  },
};

export default mutation;
