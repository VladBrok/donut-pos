import { EMPLOYEE_ROLES_ARR } from "../constants.js";
import { createAction } from "./index.js";

export const loadRolesAction = createAction<{
  roles: {
    id: string;
    codeName: (typeof EMPLOYEE_ROLES_ARR)[number];
  }[];
}>("roles/load");
