import { MutationTree } from "vuex";
import { AuthState } from "./state";
import { loggedInAction } from "donut-shared";
import { Keys, saveUserToStorage, setItem } from "../../lib/local-storage";

const mutation: MutationTree<AuthState> = {
  loggedIn(state: AuthState, action: ReturnType<typeof loggedInAction>) {
    saveUserToStorage(action.payload);
    Object.assign(state, action.payload);
  },
};

export default mutation;
