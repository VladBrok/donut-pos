import { IDiningTable } from "src/actions/current-order.js";
import { createAction } from "./index.js";

export const loadDiningTablesAction = createAction<{
  tables: IDiningTable[];
}>("diningTables/load");

export const createDiningTableAction = createAction<{
  table: Omit<IDiningTable, "id">;
}>("diningTables/create");

export const diningTableCreatedAction = createAction<{
  table: IDiningTable;
}>("diningTables/created");

export const updateDiningTableAction = createAction<{
  table: IDiningTable;
}>("diningTables/update");

export const diningTableUpdatedAction = createAction<{
  table: Partial<IDiningTable>;
}>("diningTables/updated");

export const deleteDiningTableAction = createAction<{
  id: string;
}>("diningTables/delete");

export const diningTableDeletedAction = createAction<{
  id: string;
}>("diningTables/deleted");
