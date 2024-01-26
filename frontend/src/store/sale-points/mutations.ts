import {
  loadSalePointsAction,
  salePointCreatedAction,
  salePointDeletedAction,
  salePointUpdatedAction,
} from "donut-shared";
import { loadDefaultSalePointAction } from "donut-shared/src/actions/sale-points";
import { MutationTree } from "vuex";
import { ISalePointsState } from "./state";

const mutation: MutationTree<ISalePointsState> = {
  load(
    state: ISalePointsState,
    action: ReturnType<typeof loadSalePointsAction>
  ) {
    state.salePoints = action.payload.salePoints;
  },

  loadDefault(
    state: ISalePointsState,
    action: ReturnType<typeof loadDefaultSalePointAction>
  ) {
    state.defaultSalePoint = action.payload.salePoint;
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
