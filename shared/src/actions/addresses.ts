import { createAction } from "./index.js";

export interface IAddress {
  id?: string;
  clientId?: string;
  city: string;
  street: string;
  homeNumber: string;
  postalCode: string;
}

export const addressesLoadedAction = createAction<{
  addresses: IAddress[];
}>("addresses/loaded");

export const createAddressAction = createAction<{
  address: IAddress;
}>("addresses/create");

export const addressCreatedAction = createAction<{
  address: IAddress;
}>("addresses/created");

export const deleteAddressAction = createAction<{
  id: string;
}>("addresses/delete");

export const addressDeletedAction = createAction<{
  id: string;
  clientId: string;
}>("addresses/deleted");
