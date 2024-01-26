import { ISalePoint } from "donut-shared";

export interface ISalePointsState {
  salePoints: ISalePoint[];
  defaultSalePoint?: ISalePoint;
}

const state: ISalePointsState = {
  salePoints: [],
};

export default state;
