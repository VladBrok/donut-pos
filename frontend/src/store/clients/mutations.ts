import { clientsPageLoadedAction } from "donut-shared";
import { MutationTree } from "vuex";
import { IClientsState } from "./state";

const mutation: MutationTree<IClientsState> = {
  pageLoaded(
    state: IClientsState,
    action: ReturnType<typeof clientsPageLoadedAction>
  ) {
    state.totalClients = action.payload.totalClients;
    state.clientsPage = action.payload.clientsPage;
  },
};

export default mutation;
