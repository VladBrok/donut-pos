import {
  cashPaymentRequestedAction,
  cashPaymentRequestsLoadedAction,
} from "donut-shared";
import { cashPaymentRequestDeletedAction } from "donut-shared/src/actions/cash-payment-requests";
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

  requestDeleted(
    state: ICashPaymentRequestsState,
    action: ReturnType<typeof cashPaymentRequestDeletedAction>
  ) {
    state.requests.splice(
      state.requests.findIndex((x) => x.id === action.payload.id),
      1
    );
  },
};

export default mutation;
