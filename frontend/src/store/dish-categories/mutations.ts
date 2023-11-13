import { loadDishCategoriesAction } from "donut-shared";
import { MutationTree } from "vuex";
import { IDishCategoriesState } from "./state";

const mutation: MutationTree<IDishCategoriesState> = {
  load(
    state: IDishCategoriesState,
    action: ReturnType<typeof loadDishCategoriesAction>
  ) {
    state.categories = action.payload.categories;
  },
};

export default mutation;
