import { Module } from "vuex";
import { StateInterface } from "../index";
import mutations from "./mutations";
import state, { IAuthState } from "./state";

const authModule: Module<IAuthState, StateInterface> = {
  namespaced: true,
  mutations,
  state,
};

export default authModule;
