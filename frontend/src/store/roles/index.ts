import { Module } from "vuex";
import { StateInterface } from "../index";
import mutations from "./mutations";
import state, { IRolesState } from "./state";

const rolesCategoriesModule: Module<IRolesState, StateInterface> = {
  namespaced: true,
  mutations,
  state,
};

export default rolesCategoriesModule;
