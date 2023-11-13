import { Module } from "vuex";
import { StateInterface } from "../index";
import mutations from "./mutations";
import state, { IDishCategoriesState } from "./state";

const dishCategoriesModule: Module<IDishCategoriesState, StateInterface> = {
  namespaced: true,
  mutations,
  state,
};

export default dishCategoriesModule;
