import { Module } from "vuex";
import { StateInterface } from "../index";
import mutations from "./mutations";
import state, { IDishesState } from "./state";

const dishesModule: Module<IDishesState, StateInterface> = {
  namespaced: true,
  mutations,
  state,
};

export default dishesModule;
