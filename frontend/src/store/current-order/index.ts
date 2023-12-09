import { Module } from "vuex";
import { StateInterface } from "../index";
import mutations from "./mutations";
import state, { ICurrentOrderState } from "./state";

const currentOrderModule: Module<ICurrentOrderState, StateInterface> = {
  namespaced: true,
  mutations,
  state,
};

export default currentOrderModule;
