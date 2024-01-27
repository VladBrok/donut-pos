import { IOrder } from "../actions/orders.js";
import { createAction } from "./index.js";

export const openArbitraryOrderAction = createAction<{
  order: IOrder | null;
}>("orderDrawer/openArbitraryOrder");

export const closeArbitraryOrderAction = createAction(
  "orderDrawer/closeArbitraryOrder"
);

export const openCurrentOrderAction = createAction(
  "orderDrawer/openCurrentOrder"
);

export const closeCurrentOrderAction = createAction(
  "orderDrawer/closeCurrentOrder"
);
