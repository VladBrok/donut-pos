import { loadDishCategoriesAction } from "donut-shared";
import { dishCategoryDeletedAction } from "donut-shared/src/actions";
import { MutationTree } from "vuex";
import { IDishCategoriesState } from "./state";

const mutation: MutationTree<IDishCategoriesState> = {
  load(
    state: IDishCategoriesState,
    action: ReturnType<typeof loadDishCategoriesAction>
  ) {
    state.categories = action.payload.categories;
  },
  deleted(
    state: IDishCategoriesState,
    action: ReturnType<typeof dishCategoryDeletedAction>
  ) {
    state.categories = state.categories.filter(
      (x) => x.id !== action.payload.id
    );
  },
};

export default mutation;
