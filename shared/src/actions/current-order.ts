import { IDishInOrder, IOrder } from "src/actions/orders.js";
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

export const updateCurrentOrderTypeAction = createAction<{
  type: string;
}>("currentOrder/updateType");

export const updateCurrentOrderTableNumberAction = createAction<{
  table: IDiningTable | null;
}>("currentOrder/updateTableNumber");

export const removeDishFromCurrentOrderAction = createAction<{
  dishIdInOrder: string;
}>("currentOrder/removeDish");

export const updatePreviousOrderAction = createAction<{
  order?: IOrder;
}>("currentOrder/updatePrevious");
