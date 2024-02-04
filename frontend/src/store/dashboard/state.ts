import { IAdminDashboardData } from "donut-shared";

export interface IDashboardState {
  data: IAdminDashboardData;
}

const state: IDashboardState = {
  data: {
    orderTypes: [],
  },
};

export default state;
