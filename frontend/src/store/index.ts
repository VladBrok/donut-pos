import { store } from "quasar/wrappers";
import { InjectionKey } from "vue";
import { Router } from "vue-router";
import { CrossTabClient, badge, badgeEn, log } from "@logux/client";
import { badgeStyles } from "@logux/client/badge/styles";
import { LoguxVuexStore, createStoreCreator } from "@logux/vuex";
import { Store as VuexStore, useStore as vuexUseStore } from "vuex";
import { Showcase } from "./showcase/state";
import { useStore as loguxUseStore } from "@logux/vuex";

import counter from "./counter";
import showcase from "./showcase";
import { ICounter } from "./counter/state";

// import example from './module-example'
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  example: unknown;
  showcase: Showcase;
  counter: ICounter;
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

// Initialize logux client
const client = new CrossTabClient({
  server:
    process.env.NODE_ENV === "development"
      ? "ws://localhost:31337"
      : "wss://logux.example.com",
  subprotocol: "1.0.0",
  userId: "anonymous", // TODO
  token: "", // TODO
});

const createStore = createStoreCreator(client);

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      // example
      showcase,
      counter,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING,
  });

  badge(Store.client, { messages: badgeEn, styles: badgeStyles });
  log(Store.client);
  console.log("store client start");
  Store.client.start();

  return Store;
});

export function useStore() {
  return loguxUseStore(storeKey);
}
