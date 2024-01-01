import { IDiningTable } from "donut-shared/src/actions/current-order";

export interface IDiningTablesState {
  tables: IDiningTable[];
}

const state: IDiningTablesState = {
  tables: [],
};

export default state;
