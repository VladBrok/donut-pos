import { openArbitraryOrderAction } from "donut-shared";
import { MutationTree } from "vuex";
import { IOrderDrawerState } from "./state";

const mutation: MutationTree<IOrderDrawerState> = {
  openArbitraryOrder(
    state: IOrderDrawerState,
    action: ReturnType<typeof openArbitraryOrderAction>
  ) {
    state.order = action.payload.order;
    state.isCurrentOrderOpen = false;
  },

  closeArbitraryOrder(state: IOrderDrawerState) {
    state.order = null;
    state.isCurrentOrderOpen = false;
  },

  openCurrentOrder(state: IOrderDrawerState) {
    state.isCurrentOrderOpen = true;
    state.order = null;
  },

  closeCurrentOrder(state: IOrderDrawerState) {
    state.isCurrentOrderOpen = false;
    state.order = null;
  },
};

export default mutation;
