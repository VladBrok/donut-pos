import { loadRolesAction } from "donut-shared";

export interface IRolesState {
  roles: ReturnType<typeof loadRolesAction>["payload"]["roles"];
}

const state: IRolesState = {
  roles: [],
};

export default state;
