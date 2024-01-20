import { addressesLoadedAction } from "donut-shared/src/actions/addresses";
import { MutationTree } from "vuex";
import { IAddressesState } from "./state";

const mutation: MutationTree<IAddressesState> = {
  loaded(
    state: IAddressesState,
    action: ReturnType<typeof addressesLoadedAction>
  ) {
    state.addresses = action.payload.addresses;
  },
};

export default mutation;
