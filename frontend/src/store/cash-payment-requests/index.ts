import { Module } from "vuex";
import { StateInterface } from "../index";
import mutations from "./mutations";
import state, { ICashPaymentRequestsState } from "./state";

const cashPaymentRequestsModule: Module<
  ICashPaymentRequestsState,
  StateInterface
> = {
  namespaced: true,
  mutations,
  state,
};

export default cashPaymentRequestsModule;
