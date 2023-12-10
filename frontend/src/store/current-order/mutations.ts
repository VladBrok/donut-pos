import {
  addDishToCurrentOrderAction,
  assert,
  decrementDishInCurrentOrderAction,
  removeDishFromCurrentOrderAction,
  updateCurrentOrderCommentAction,
  updateCurrentOrderTableNumberAction,
} from "donut-shared";
import { ICurrentOrderDishPayload } from "donut-shared/src/actions/current-order";
import { MutationTree } from "vuex";
import { ICurrentOrderState, makeEmptyOrder } from "./state";

function getUniqueId(dish: ICurrentOrderDishPayload) {
  return (
    dish.id + dish.modifications.map((x) => `${x.id}_${x.count}`).join(",")
  );
}

const mutation: MutationTree<ICurrentOrderState> = {
  addDish(
    state: ICurrentOrderState,
    action: ReturnType<typeof addDishToCurrentOrderAction>
  ) {
    if (!state.order) {
      state.order = makeEmptyOrder();
    }

    const uniqueId = getUniqueId(action.payload.dish);
    const existingIdx = state.order.dishes.findIndex(
      (x) => x.uniqueId === uniqueId
    );

    if (existingIdx > -1) {
      state.order.dishes[existingIdx].count++;
    } else {
      state.order.dishes.push({
        count: 1,
        dishId: action.payload.dish.id,
        modifications: action.payload.dish.modifications,
        uniqueId: uniqueId,
      });
    }
  },

  decrementDish(
    state: ICurrentOrderState,
    action: ReturnType<typeof decrementDishInCurrentOrderAction>
  ) {
    assert(state.order, "Cannot decrement dish on empty order");

    const uniqueId = getUniqueId(action.payload.dish);
    const existingIdx = state.order.dishes.findIndex(
      (x) => x.uniqueId === uniqueId
    );

    if (existingIdx > -1) {
      assert(
        state.order.dishes[existingIdx].count > 1,
        "Cannot decrement dish to 0"
      );
      state.order.dishes[existingIdx].count--;
    }
  },

  removeDish(
    state: ICurrentOrderState,
    action: ReturnType<typeof removeDishFromCurrentOrderAction>
  ) {
    assert(state.order, "Cannot remove dish from empty order");

    state.order.dishes = state.order.dishes.filter(
      (x) => x.uniqueId !== action.payload.uniqueId
    );
  },

  clear(state: ICurrentOrderState) {
    state.order = null;
  },

  updateComment(
    state: ICurrentOrderState,
    action: ReturnType<typeof updateCurrentOrderCommentAction>
  ) {
    assert(
      state.order,
      "Cannot update current order comment when order is empty"
    );

    state.order.comment = action.payload.comment;
  },

  updateTableNumber(
    state: ICurrentOrderState,
    action: ReturnType<typeof updateCurrentOrderTableNumberAction>
  ) {
    assert(
      state.order,
      "Cannot update current order tableNumber when order is empty"
    );

    state.order.tableNumber = action.payload.tableNumber;
  },
};

export default mutation;