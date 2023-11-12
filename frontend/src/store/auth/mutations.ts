import { loggedInAction } from "donut-shared";
import { ANONYMOUS } from "donut-shared/src/constants";
import { MutationTree } from "vuex";
import { IAuthState } from "./state";

const mutation: MutationTree<IAuthState> = {
  loggedIn(state: IAuthState, action: ReturnType<typeof loggedInAction>) {
    state.user = action.payload;
  },
  logOut(state: IAuthState) {
    state.user = ANONYMOUS;
  },
};

export default mutation;
