import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { IAuthState } from "./state";

const actions: ActionTree<IAuthState, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default actions;
