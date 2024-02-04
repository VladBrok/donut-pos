import { adminDashboardLoadedAction } from "donut-shared/src/actions/dashboard";
import { MutationTree } from "vuex";
import { IDashboardState } from "./state";

const mutation: MutationTree<IDashboardState> = {
  loaded(
    state: IDashboardState,
    action: ReturnType<typeof adminDashboardLoadedAction>
  ) {
    state.data = action.payload.data;
  },
};

export default mutation;
