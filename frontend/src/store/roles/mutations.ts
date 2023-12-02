import { loadRolesAction } from "donut-shared";
import { MutationTree } from "vuex";
import { IRolesState } from "./state";

const mutation: MutationTree<IRolesState> = {
  load(state: IRolesState, action: ReturnType<typeof loadRolesAction>) {
    state.roles = action.payload.roles;
  },
};

export default mutation;
