import {
  addressCreatedAction,
  addressesLoadedAction,
} from "donut-shared/src/actions/addresses";
import { MutationTree } from "vuex";
import { IAddressesState } from "./state";

const mutation: MutationTree<IAddressesState> = {
  loaded(
    state: IAddressesState,
    action: ReturnType<typeof addressesLoadedAction>
  ) {
    state.addresses = action.payload.addresses;
  },

  created(
    state: IAddressesState,
    action: ReturnType<typeof addressCreatedAction>
  ) {
    state.addresses.push(action.payload.address);
  },
};

export default mutation;
