import {
  addressCreatedAction,
  addressDeletedAction,
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

  deleted(
    state: IAddressesState,
    action: ReturnType<typeof addressDeletedAction>
  ) {
    const idx = state.addresses.findIndex((x) => x.id === action.payload.id);
    if (idx > -1) {
      state.addresses.splice(idx, 1);
    }
  },
};

export default mutation;
