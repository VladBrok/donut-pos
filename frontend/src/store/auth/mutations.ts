import { MutationTree } from "vuex";
import { ANONYMOUS, IAuthState } from "./state";
import { log, loggedInAction } from "donut-shared";
import { Keys, removeItem, saveUserToStorage } from "../../lib/local-storage";

const mutation: MutationTree<IAuthState> = {
  loggedIn(state: IAuthState, action: ReturnType<typeof loggedInAction>) {
    saveUserToStorage(action.payload);
    state.user = action.payload;
  },
  logOut(state: IAuthState) {
    removeItem(Keys.User);
    state.user = ANONYMOUS;
    (this.$router as any).push("/admin/login");
  },
};

export default mutation;
