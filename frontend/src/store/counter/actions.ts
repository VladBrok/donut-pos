import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { ICounter } from "./state";

const actions: ActionTree<ICounter, StateInterface> = {
  increment(context) {
    setTimeout(() => {
      context.commit("increment", { amount: 5 });
    }, 2000);
  },
};

export default actions;
