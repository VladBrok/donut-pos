import {
  loadSalePointsAction,
  salePointCreatedAction,
  salePointDeletedAction,
  salePointUpdatedAction,
} from "donut-shared";
import { MutationTree } from "vuex";
import { ISalePointsState } from "./state";

const mutation: MutationTree<ISalePointsState> = {
  load(
    state: ISalePointsState,
    action: ReturnType<typeof loadSalePointsAction>
  ) {
    console.log("load");
    state.salePoints = action.payload.salePoints;
  },

  deleted(
    state: ISalePointsState,
    action: ReturnType<typeof salePointDeletedAction>
  ) {
    state.salePoints = state.salePoints.filter(
      (x) => x.id !== action.payload.id
    );
  },

  created(
    state: ISalePointsState,
    action: ReturnType<typeof salePointCreatedAction>
  ) {
    state.salePoints.push(action.payload.salePoint);
  },

  updated(
    state: ISalePointsState,
    action: ReturnType<typeof salePointUpdatedAction>
  ) {
    const salePoint = state.salePoints.find(
      (x) => x.id === action.payload.salePoint.id
    );
    if (salePoint) {
      Object.assign(salePoint, action.payload);
    }
  },
};

export default mutation;
