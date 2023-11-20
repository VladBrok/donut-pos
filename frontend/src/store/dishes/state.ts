import { loadDishesAction } from "donut-shared/src/actions/dishes";

export interface IDishesState {
  dishes: ReturnType<typeof loadDishesAction>["payload"]["dishes"];
}

const state: IDishesState = {
  dishes: [],
};

export default state;
