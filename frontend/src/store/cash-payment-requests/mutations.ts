import {
  cashPaymentRequestedAction,
  cashPaymentRequestsLoadedAction,
} from "donut-shared";
import { MutationTree } from "vuex";
import { ICashPaymentRequestsState } from "./state";

const mutation: MutationTree<ICashPaymentRequestsState> = {
  loaded(
    state: ICashPaymentRequestsState,
    action: ReturnType<typeof cashPaymentRequestsLoadedAction>
  ) {
    state.requests = action.payload.requests;
  },

  requested(
    state: ICashPaymentRequestsState,
    action: ReturnType<typeof cashPaymentRequestedAction>
  ) {
    state.requests.push(action.payload.request);
  },
};

export default mutation;
