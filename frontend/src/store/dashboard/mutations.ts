import {
  adminDashboardLoadedAction,
  updateAdminDashboardOrderCreated,
} from "donut-shared/src/actions/dashboard";
import { MutationTree } from "vuex";
import { IDashboardState } from "./state";

const mutation: MutationTree<IDashboardState> = {
  loaded(
    state: IDashboardState,
    action: ReturnType<typeof adminDashboardLoadedAction>
  ) {
    state.data = action.payload.data;
  },

  orderCreated(
    state: IDashboardState,
    action: ReturnType<typeof updateAdminDashboardOrderCreated>
  ) {
    state.data.orderCount++;
    const orderType = state.data.orderTypes.find(
      (x) => x.type === action.payload.order.type
    );
    if (orderType) {
      orderType.count++;
    }
  },
};

export default mutation;
