import { Module } from "vuex";
import { StateInterface } from "../index";
import mutations from "./mutations";
import state, { IOrderDrawerState } from "./state";

const orderDrawerModule: Module<IOrderDrawerState, StateInterface> = {
  namespaced: true,
  mutations,
  state,
};

export default orderDrawerModule;
