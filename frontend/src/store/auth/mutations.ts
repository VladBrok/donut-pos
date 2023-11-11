import { loggedInAction } from "donut-shared";
import { MutationTree } from "vuex";
import { Keys, removeItem } from "../../lib/local-storage";
import { ANONYMOUS, IAuthState } from "./state";

const mutation: MutationTree<IAuthState> = {
  loggedIn(state: IAuthState, action: ReturnType<typeof loggedInAction>) {
    state.user = action.payload;
  },
  logOut(state: IAuthState) {
    removeItem(Keys.User);
    state.user = ANONYMOUS;
    (this.$router as any)?.push("/admin/login");
  },
};

export default mutation;
