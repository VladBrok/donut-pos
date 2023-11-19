import { loadDishesAction } from "donut-shared/src/actions";
import { MutationTree } from "vuex";
import { IDishesState } from "./state";

const mutation: MutationTree<IDishesState> = {
  load(state: IDishesState, action: ReturnType<typeof loadDishesAction>) {
    state.dishes = action.payload.dishes;
  },
};

export default mutation;
