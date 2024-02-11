import { IAddress } from "../actions/addresses.js";
import { IDishInOrder, IOrder } from "../actions/orders.js";
import { createAction } from "./index.js";

export interface IDiningTable {
  id: string;
  number: string;
  employee: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export const addDishToCurrentOrderAction = createAction<{
  dish: IDishInOrder;
}>("currentOrder/addDish");

export const decrementDishInCurrentOrderAction = createAction<{
  dish: IDishInOrder;
}>("currentOrder/decrementDish");

export const clearCurrentOrderAction = createAction("currentOrder/clear");

export const updateCurrentOrderCommentAction = createAction<{
  comment: string;
}>("currentOrder/updateComment");

export const updateCurrentOrderClientPhoneAction = createAction<{
  phone: string;
}>("currentOrder/updateClientPhone");

export const updateCurrentOrderClientFirstNameAction = createAction<{
  firstName: string;
}>("currentOrder/updateClientFirstName");

export const updateCurrentOrderTypeAction = createAction<{
  type: string;
}>("currentOrder/updateType");

export const updateCurrentOrderTableNumberAction = createAction<{
  table: IDiningTable | null;
}>("currentOrder/updateTableNumber");

export const updateCurrentOrderAddressAction = createAction<{
  address: IAddress;
}>("currentOrder/updateAddress");

export const removeDishFromCurrentOrderAction = createAction<{
  dishIdInOrder: string;
}>("currentOrder/removeDish");

export const updatePreviousOrderAction = createAction<{
  order?: IOrder;
}>("currentOrder/updatePrevious");
