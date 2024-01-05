import { createAction } from "../actions/index.js";

export interface IClient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  registeredAt: string;
  passwordHash: string;
}

export const loadClientsPageAction = createAction<{
  page: number;
  search?: string;
}>("clients/loadPage");

export const clientsPageLoadedAction = createAction<{
  totalClients: number;
  clientsPage: IClient[];
}>("clients/pageLoaded");
