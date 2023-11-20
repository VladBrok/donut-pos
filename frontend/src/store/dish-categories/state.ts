import { loadDishCategoriesAction } from "donut-shared/src/actions/dish-categories";

export interface IDishCategoriesState {
  categories: ReturnType<
    typeof loadDishCategoriesAction
  >["payload"]["categories"];
}

const state: IDishCategoriesState = {
  categories: [],
};

export default state;
