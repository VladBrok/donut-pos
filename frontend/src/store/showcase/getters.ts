import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { Showcase } from "./state";

const getters: GetterTree<Showcase, StateInterface> = {
  someGetter(/* context */) {
    // your code
  },
};

export default getters;
