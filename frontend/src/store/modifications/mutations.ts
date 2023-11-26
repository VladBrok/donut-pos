import {
  loadModificationsAction,
  modificationCreatedAction,
  modificationDeletedAction,
  modificationUpdatedAction,
} from "donut-shared";
import { MutationTree } from "vuex";
import { IModificationsState } from "./state";

const mutation: MutationTree<IModificationsState> = {
  load(
    state: IModificationsState,
    action: ReturnType<typeof loadModificationsAction>
  ) {
    state.modifications = action.payload.modifications;
  },

  deleted(
    state: IModificationsState,
    action: ReturnType<typeof modificationDeletedAction>
  ) {
    state.modifications = state.modifications.filter(
      (x) => x.id !== action.payload.id
    );
  },

  created(
    state: IModificationsState,
    action: ReturnType<typeof modificationCreatedAction>
  ) {
    state.modifications.push(action.payload);
  },

  updated(
    state: IModificationsState,
    action: ReturnType<typeof modificationUpdatedAction>
  ) {
    const modification = state.modifications.find(
      (x) => x.id === action.payload.id
    );
    if (modification) {
      Object.assign(modification, action.payload);
    }
  },
};

export default mutation;
