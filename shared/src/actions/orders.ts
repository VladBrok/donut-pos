import { ICurrentOrder } from "src/actions/current-order.js";
import { createAction } from "./index.js";

export const createOrderAction = createAction<{
  order: ICurrentOrder;
}>("orders/create");

// TODO: add order to payload (<{}>)
export const orderCreatedAction = createAction("orders/created");
