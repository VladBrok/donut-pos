import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { AuthState } from "./state";

const actions: ActionTree<AuthState, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default actions;
