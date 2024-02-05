import { Module } from "vuex";
import { StateInterface } from "../index";
import mutations from "./mutations";
import state, { IAddressesState } from "./state";

const logModule: Module<IAddressesState, StateInterface> = {
  namespaced: true,
  mutations,
  state,
};

export default logModule;
