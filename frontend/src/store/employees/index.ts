import { Module } from "vuex";
import { StateInterface } from "../index";
import mutations from "./mutations";
import state, { IEmployeesState } from "./state";

const employeesModule: Module<IEmployeesState, StateInterface> = {
  namespaced: true,
  mutations,
  state,
};

export default employeesModule;
