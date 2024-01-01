import { createAction } from "./index.js";

export interface ICurrentOrderDishModification {
  id: string;
  count: number;
}

export interface ICurrentOrderDishPayload {
  id: string;
  modifications: ICurrentOrderDishModification[];
}

export interface ICurrentOrderDish {
  dishId: string;
  /** Used to uniquely identify this dish. We can't rely only on `dishId` because of modifications. */
  uniqueId: string;
  count: number;
  modifications: ICurrentOrderDishModification[];
}

export interface IDiningTable {
  id: string;
  number: string;
  employee: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface ICurrentOrder {
  comment: string;
  table: IDiningTable | null;
  clientId: string;
  dishes: ICurrentOrderDish[];
}

export const addDishToCurrentOrderAction = createAction<{
  dish: ICurrentOrderDishPayload;
}>("currentOrder/addDish");

export const decrementDishInCurrentOrderAction = createAction<{
  dish: ICurrentOrderDishPayload;
}>("currentOrder/decrementDish");

export const clearCurrentOrderAction = createAction("currentOrder/clear");

export const updateCurrentOrderCommentAction = createAction<{
  comment: string;
}>("currentOrder/updateComment");

export const updateCurrentOrderTableNumberAction = createAction<{
  table: IDiningTable | null;
}>("currentOrder/updateTableNumber");

export const removeDishFromCurrentOrderAction = createAction<{
  uniqueId: string;
}>("currentOrder/removeDish");
