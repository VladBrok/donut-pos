import { Module } from "vuex";
import { StateInterface } from "../index";
import mutations from "./mutations";
import state, { IModificationsState } from "./state";

const modificationsModule: Module<IModificationsState, StateInterface> = {
  namespaced: true,
  mutations,
  state,
};

export default modificationsModule;
