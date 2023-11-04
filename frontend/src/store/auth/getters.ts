import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { AuthState } from "./state";

const getters: GetterTree<AuthState, StateInterface> = {
  someGetter(/* context */) {
    // your code
  },
};

export default getters;
