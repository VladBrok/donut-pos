import { MutationTree } from "vuex";
import { IAuthState } from "./state";
import { loggedInAction } from "donut-shared";
import { Keys, setItem } from "../../lib/local-storage";

const mutation: MutationTree<IAuthState> = {
  loggedIn(state: IAuthState, action: ReturnType<typeof loggedInAction>) {
    setItem(Keys.User, action.payload);
  },
};

export default mutation;
