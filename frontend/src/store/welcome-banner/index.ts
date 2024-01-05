import { Module } from "vuex";
import { StateInterface } from "../index";
import mutations from "./mutations";
import state, { IWelcomeBannerState } from "./state";

const welcomeBannerModule: Module<IWelcomeBannerState, StateInterface> = {
  namespaced: true,
  mutations,
  state,
};

export default welcomeBannerModule;
