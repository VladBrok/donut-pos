import { addDishToCurrentOrderAction } from "donut-shared";
import { MutationTree } from "vuex";
import { ICurrentOrderState } from "./state";

const mutation: MutationTree<ICurrentOrderState> = {
  // TODO: if count will turn to 0 during decrement - remove the dish

  addDish(
    state: ICurrentOrderState,
    action: ReturnType<typeof addDishToCurrentOrderAction>
  ) {
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
};

export default mutation;
