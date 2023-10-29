import { MutationTree } from "vuex";
import { Showcase } from "./state";

const mutation: MutationTree<Showcase> = {
  updateIsOpen(state: Showcase, isOpen: boolean) {
    state.isDrawerOpen = isOpen;
  },
};

export default mutation;
