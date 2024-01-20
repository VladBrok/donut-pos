import { createAction } from "./index.js";

export interface IAddress {
  id?: string;
  city: string;
  street: string;
  homeNumber: string;
  postalCode: string;
}

export const addressesLoadedAction = createAction<{
  addresses: IAddress[];
}>("addresses/loaded");
