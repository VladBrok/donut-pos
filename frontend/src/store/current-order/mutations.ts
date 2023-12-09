import {
  addDishToCurrentOrderAction,
  assert,
  updateCurrentOrderCommentAction,
} from "donut-shared";
import { MutationTree } from "vuex";
import { ICurrentOrderState, makeEmptyOrder } from "./state";

const mutation: MutationTree<ICurrentOrderState> = {
  // TODO: if count will turn to 0 during decrement - remove the dish

  addDish(
    state: ICurrentOrderState,
    action: ReturnType<typeof addDishToCurrentOrderAction>
  ) {
    if (!state.order) {
      state.order = makeEmptyOrder();
    }

    const uniqueId =
      action.payload.dish.id +
      action.payload.dish.modifications
        .map((x) => `${x.id}_${x.count}`)
        .join(",");
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
};

export default mutation;
