import { MutationTree } from "vuex";
import { IWelcomeBannerState } from "./state";

const mutation: MutationTree<IWelcomeBannerState> = {
  open(state: IWelcomeBannerState) {
    state.isOpen = true;
  },

  close(state: IWelcomeBannerState) {
    state.isOpen = false;
  },
};

export default mutation;
