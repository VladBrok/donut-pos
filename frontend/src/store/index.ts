import { CrossTabClient, badge, badgeEn, log as loguxLog } from "@logux/client";
import { badgeStyles } from "@logux/client/badge/styles";
import {
  LoguxVuexStore,
  createStoreCreator,
  useStore as loguxUseStore,
} from "@logux/vuex";
import { Notify } from "quasar";
import { store } from "quasar/wrappers";
import { InjectionKey } from "vue";
import { Router } from "vue-router";
import { Store as VuexStore } from "vuex";

import { UserNotFound, log, logoutAction } from "donut-shared";
import { LogType } from "donut-shared/src/log";
import { useI18nStore } from "../lib/i18n";
import { getUserFromStorage } from "../lib/local-storage";
import auth from "./auth";
import { ANONYMOUS, IAuthState } from "./auth/state";
import counter from "./counter";
import { ICounter } from "./counter/state";

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  counter: ICounter;
  auth: IAuthState;
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
      : "ws://localhost:31337",
  // : "wss://logux.example.com",
  subprotocol: "1.0.0",
  userId: getUserFromStorage()?.userId || ANONYMOUS.userId,
  token: getUserFromStorage()?.accessToken || "",
});

const createStore = createStoreCreator(client, {
  // TODO: find out what it does and whether we need this
  // saveStateEvery: 1,
});

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      counter,
      auth,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING,
  });

  Store.client.type("logux/undo", (action) => {
    const t = useI18nStore();

    const reason = (action as any).reason;
    if (!reason) {
      return;
    }

    let message = "";
    if (!(t.value as any)[reason]) {
      log(
        `translation for the undo reason "${reason}" was not found`,
        LogType.Warn
      );
      message = reason;
    } else {
      message =
        reason === UserNotFound
          ? t.value.userNotFound({
              phone: (action as any).action.payload.phone,
            })
          : (t.value as any)[reason];
    }

    Notify.create({
      type: "negative",
      position: "top",
      timeout: 6000,
      message: message,
    });
  });

  Store.client.node.catch((err) => {
    log(JSON.stringify(err), LogType.Error);
    if (err.name === "LoguxError") {
      if (err.type === "wrong-credentials") {
        Store.commit.crossTab(
          logoutAction({
            accessToken: "",
          })
        );
      }
    }
  });

  badge(Store.client, {
    messages: badgeEn,
    styles: badgeStyles,
  });
  loguxLog(Store.client);

  Store.client.start();

  // Hack to save the initial state to logux.
  // Without this, first `undo` may remove the whole state
  Store.commit("save_initial_state_hack");

  return Store;
});

export function useStore() {
  return loguxUseStore(storeKey);
}
