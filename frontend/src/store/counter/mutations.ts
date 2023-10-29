import { MutationTree } from "vuex";
import { ICounter } from "./state";

const mutation: MutationTree<ICounter> = {
  increment(state: ICounter, payload) {
    state.count += payload?.amount ?? 1;
  },
  decrement(state: ICounter) {
    state.count--;
  },
};

export default mutation;
