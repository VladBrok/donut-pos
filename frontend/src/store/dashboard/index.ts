import { Module } from "vuex";
import { StateInterface } from "../index";
import mutations from "./mutations";
import state, { IDashboardState } from "./state";

const dashboardModule: Module<IDashboardState, StateInterface> = {
  namespaced: true,
  mutations,
  state,
};

export default dashboardModule;
