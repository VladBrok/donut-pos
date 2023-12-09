import { createAction } from "./index.js";

export interface ICurrentOrderDishModification {
  id: string;
  count: number;
}

export interface ICurrentOrderDish {
  dishId: string;
  /** Used to uniquely identify this dish. We can't rely only on `dishId` because of modifications. */
  uniqueId: string;
  count: number;
  modifications: ICurrentOrderDishModification[];
}

export interface ICurrentOrder {
  comment: string;
  tableNumber: string;
  clientId: string;
  dishes: ICurrentOrderDish[];
}

export const addDishToCurrentOrderAction = createAction<{
  dish: {
    id: string;
    modifications: ICurrentOrderDishModification[];
  };
}>("currentOrder/addDish");

export const clearCurrentOrderAction = createAction("currentOrder/clear");
