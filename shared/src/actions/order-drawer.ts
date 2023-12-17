import { ordersPageLoadedAction } from "src/actions/orders.js";
import { createAction } from "./index.js";

export const openArbitraryOrderAction = createAction<{
  order: ReturnType<
    typeof ordersPageLoadedAction
  >["payload"]["ordersPage"][number];
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
