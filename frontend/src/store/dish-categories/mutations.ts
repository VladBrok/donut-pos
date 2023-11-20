import {
  dishCategoryCreatedAction,
  dishCategoryDeletedAction,
  dishCategoryUpdatedAction,
  loadDishCategoriesAction,
} from "donut-shared/src/actions/dish-categories";
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

  created(
    state: IDishCategoriesState,
    action: ReturnType<typeof dishCategoryCreatedAction>
  ) {
    state.categories.push(action.payload);
  },

  updated(
    state: IDishCategoriesState,
    action: ReturnType<typeof dishCategoryUpdatedAction>
  ) {
    const category = state.categories.find((x) => x.id === action.payload.id);
    if (category) {
      Object.assign(category, action.payload);
    }
  },
};

export default mutation;
