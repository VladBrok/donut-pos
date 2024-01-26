import { Module } from "vuex";
import { StateInterface } from "../index";
import mutations from "./mutations";
import state, { ISalePointsState } from "./state";

const salePointsModule: Module<ISalePointsState, StateInterface> = {
  namespaced: true,
  mutations,
  state,
};

export default salePointsModule;
