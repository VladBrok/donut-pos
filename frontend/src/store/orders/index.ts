import { Module } from "vuex";
import { StateInterface } from "../index";
import mutations from "./mutations";
import state, { IOrdersState } from "./state";

const ordersModule: Module<IOrdersState, StateInterface> = {
  namespaced: true,
  mutations,
  state,
};

export default ordersModule;
