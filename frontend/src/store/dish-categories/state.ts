import { loadDishCategoriesAction } from "donut-shared";

export interface IDishCategoriesState {
  categories: ReturnType<
    typeof loadDishCategoriesAction
  >["payload"]["categories"];
}

const state: IDishCategoriesState = {
  categories: [],
};

export default state;
