import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { ICounter } from "./state";

const getters: GetterTree<ICounter, StateInterface> = {
  count(context) {
    return context.count;
  },
};

export default getters;
