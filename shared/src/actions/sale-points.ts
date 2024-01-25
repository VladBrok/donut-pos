import { IAddress } from "src/actions/addresses.js";
import { createAction } from "./index.js";

export interface IWorkSchedule {
  /**
   * Sunday - Saturday : 0 - 6
   */
  dayOfWeek: number;
  openingTime: string;
  closingTime: string;
  breakStart: string;
  breakEnd: string;
}

export interface ISalePoint {
  id: string;
  address: IAddress;
  name: string;
  phone: string;
  email: string;
  workSchedule: IWorkSchedule[];
  isDefault: boolean;
}

export const loadSalePointsAction = createAction<{
  salePoints: ISalePoint[];
}>("salePoints/load");

export const deleteSalePointAction = createAction<{
  id: string;
}>("salePoints/delete");

export const createSalePointAction = createAction<{
  salePoint: ISalePoint;
}>("salePoints/create");

export const salePointCreatedAction = createAction<{
  salePoint: ISalePoint;
}>("salePoints/created");

export const updateSalePointAction = createAction<{
  salePoint: ISalePoint;
}>("salePoints/update");

export const salePointUpdatedAction = createAction<{
  salePoint: ISalePoint;
}>("salePoints/updated");

export const salePointDeletedAction = createAction<{
  id: string;
}>("salePoints/deleted");
