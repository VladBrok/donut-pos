import { MutationTree } from "vuex";
import { ICounter } from "./state";

const mutation: MutationTree<ICounter> = {
  init(state: ICounter, action) {
    state.count = action.count;
  },
  increment(state: ICounter, payload) {
    console.log(payload);
    state.count += payload?.amount ?? 1;
  },
  decrement(state: ICounter) {
    state.count--;
  },
};

export default mutation;
