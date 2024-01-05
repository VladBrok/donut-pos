import { Module } from "vuex";
import { StateInterface } from "../index";
import mutations from "./mutations";
import state, { IClientsState } from "./state";

const clientsModule: Module<IClientsState, StateInterface> = {
  namespaced: true,
  mutations,
  state,
};

export default clientsModule;
