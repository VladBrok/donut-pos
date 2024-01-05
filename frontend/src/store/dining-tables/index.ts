import { Module } from "vuex";
import { StateInterface } from "../index";
import mutations from "./mutations";
import state, { IDiningTablesState } from "./state";

const diningTablesModule: Module<IDiningTablesState, StateInterface> = {
  namespaced: true,
  mutations,
  state,
};

export default diningTablesModule;
