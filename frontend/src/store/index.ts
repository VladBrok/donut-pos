import { log as logLoguxEvents } from "@logux/client";
import {
  LoguxVuexStore,
  createStoreCreator,
  useStore as loguxUseStore,
} from "@logux/vuex";
import { store } from "quasar/wrappers";
import { InjectionKey } from "vue";
import { Router } from "vue-router";
import { Store as VuexStore } from "vuex";

import { assert } from "donut-shared";
import { IAddressesState } from "src/store/addresses/state";
import { ICashPaymentRequestsState } from "src/store/cash-payment-requests/state";
import { IClientsState } from "src/store/clients/state";
import { ICurrentOrderState } from "src/store/current-order/state";
import { IDashboardState } from "src/store/dashboard/state";
import { IDiningTablesState } from "src/store/dining-tables/state";
import { IOrderDrawerState } from "src/store/order-drawer/state";
import { IOrdersState } from "src/store/orders/state";
import { ISalePointsState } from "src/store/sale-points/state";
import { IWelcomeBannerState } from "src/store/welcome-banner/state";
import { createClient } from "../lib/logux/create-client";
import { setErrorHandler } from "../lib/logux/set-error-handler";
import { setUndoHandler } from "../lib/logux/set-undo-handler";
import { watchSyncStatus } from "../lib/logux/watch-sync-status";
import addresses from "./addresses";
import auth from "./auth";
import { IAuthState } from "./auth/state";
import cashPaymentRequests from "./cash-payment-requests";
import clients from "./clients";
import currentOrder from "./current-order";
import dashboard from "./dashboard";
import diningTables from "./dining-tables";
import dishCategories from "./dish-categories";
import { IDishCategoriesState } from "./dish-categories/state";
import dishes from "./dishes";
import { IDishesState } from "./dishes/state";
import employees from "./employees";
import { IEmployeesState } from "./employees/state";
import modifications from "./modifications";
import { IModificationsState } from "./modifications/state";
import orderDrawer from "./order-drawer";
import orders from "./orders";
import roles from "./roles";
import { IRolesState } from "./roles/state";
import salePoints from "./sale-points";
import welcomeBanner from "./welcome-banner";

export interface StateInterface {
  auth: IAuthState;
  dishCategories: IDishCategoriesState;
  dishes: IDishesState;
  modifications: IModificationsState;
  employees: IEmployeesState;
  roles: IRolesState;
  currentOrder: ICurrentOrderState;
  orders: IOrdersState;
  orderDrawer: IOrderDrawerState;
  diningTables: IDiningTablesState;
  welcomeBanner: IWelcomeBannerState;
  cashPaymentRequests: ICashPaymentRequestsState;
  clients: IClientsState;
  addresses: IAddressesState;
  salePoints: ISalePointsState;
  dashboard: IDashboardState;
}

// provide typings for `this.$store`
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: LoguxVuexStore<StateInterface>;
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> =
  Symbol("vuex-key");

// Provide typings for `this.$router` inside Vuex stores
declare module "vuex" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface Store<S> {
    readonly $router: Router;
  }
}

const client = createClient();
const createStore = createStoreCreator(client, {
  // saveStateEvery: 1,
});

export default store(function (/* { ssrContext } */) {
  const modules = {
    auth,
    dishCategories,
    dishes,
    modifications,
    employees,
    roles,
    currentOrder,
    orders,
    orderDrawer,
    diningTables,
    welcomeBanner,
    cashPaymentRequests,
    clients,
    addresses,
    salePoints,
    dashboard,
  };

  for (const module of Object.values(modules)) {
    assert(
      typeof module.state !== "function",
      "Function state is not supported by this version of logux/vuex"
    );
  }

  const Store = createStore<StateInterface>({
    modules: modules,

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING,
  });

  setUndoHandler(Store);
  setErrorHandler(Store);
  watchSyncStatus(Store.client);
  logLoguxEvents(Store.client);
  // confirm(Store.client);

  Store.client.start();

  // Hack to save the initial state to logux.
  // Without this, first `undo` may remove the whole state
  Store.commit("save_initial_state_hack");

  return Store;
});

export function useStore() {
  return loguxUseStore(storeKey);
}
