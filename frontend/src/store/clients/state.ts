import { IClient } from "donut-shared";

export interface IClientsState {
  totalClients: number;
  clientsPage: IClient[];
}

const state: IClientsState = {
  totalClients: 0,
  clientsPage: [],
};

export default state;
