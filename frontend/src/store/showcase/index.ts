import { Module } from "vuex";
import { StateInterface } from "../index";
import state, { Showcase } from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const exampleModule: Module<Showcase, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default exampleModule;
