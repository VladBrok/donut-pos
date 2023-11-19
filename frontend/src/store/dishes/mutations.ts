import {
  dishCreatedAction,
  dishDeletedAction,
  loadDishesAction,
} from "donut-shared/src/actions";
import { MutationTree } from "vuex";
import { IDishesState } from "./state";

const mutation: MutationTree<IDishesState> = {
  load(state: IDishesState, action: ReturnType<typeof loadDishesAction>) {
    state.dishes = action.payload.dishes;
  },

  deleted(state: IDishesState, action: ReturnType<typeof dishDeletedAction>) {
    state.dishes = state.dishes.filter((x) => x.id !== action.payload.id);
  },

  created(state: IDishesState, action: ReturnType<typeof dishCreatedAction>) {
    state.dishes.push(action.payload);
  },
};

export default mutation;
