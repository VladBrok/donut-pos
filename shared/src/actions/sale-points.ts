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
}>("sale-points/load");

export const deleteSalePointAction = createAction<{
  id: string;
}>("sale-points/delete");

export const createSalePointAction = createAction<{
  salePoint: ISalePoint;
}>("sale-points/create");

export const salePointCreatedAction = createAction<{
  salePoint: ISalePoint;
}>("sale-points/created");

export const updateSalePointAction = createAction<{
  salePoint: ISalePoint;
}>("sale-points/update");

export const salePointUpdatedAction = createAction<{
  salePoint: ISalePoint;
}>("sale-points/updated");

export const salePointDeletedAction = createAction<{
  id: string;
}>("sale-points/deleted");
