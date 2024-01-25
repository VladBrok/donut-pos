import { ISalePoint } from "donut-shared";

export interface ISalePointsState {
  salePoints: ISalePoint[];
}

const state: ISalePointsState = {
  salePoints: [],
};

export default state;
