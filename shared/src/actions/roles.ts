import { createAction } from "./index.js";

export const loadRolesAction = createAction<{
  roles: {
    id: string;
    codeName: string;
  }[];
}>("roles/load");
