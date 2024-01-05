import {
  diningTableCreatedAction,
  diningTableDeletedAction,
  diningTableUpdatedAction,
  loadDiningTablesAction,
} from "donut-shared";
import { MutationTree } from "vuex";
import { IDiningTablesState } from "./state";

const mutation: MutationTree<IDiningTablesState> = {
  load(
    state: IDiningTablesState,
    action: ReturnType<typeof loadDiningTablesAction>
  ) {
    state.tables = action.payload.tables;
  },

  deleted(
    state: IDiningTablesState,
    action: ReturnType<typeof diningTableDeletedAction>
  ) {
    state.tables = state.tables.filter((x) => x.id !== action.payload.id);
  },

  created(
    state: IDiningTablesState,
    action: ReturnType<typeof diningTableCreatedAction>
  ) {
    state.tables.push(action.payload.table);
  },

  updated(
    state: IDiningTablesState,
    action: ReturnType<typeof diningTableUpdatedAction>
  ) {
    const table = state.tables.find((x) => x.id === action.payload.table.id);
    if (table) {
      Object.assign(table, action.payload);
    }
  },
};

export default mutation;
