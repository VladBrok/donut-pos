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

import { UserNotFound, logoutAction } from "donut-shared";
import { logError, logInfo, logWarn } from "donut-shared/src/log";
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
  // Bug when using IndexedStore: disable server -> add actions to log -> reload the page -> add actions to log -> UI is not updated
  // store: new IndexedStore(),
});

const createStore = createStoreCreator(client, {
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

  Store.client.type("logux/undo", (undoneAction) => {
    const t = useI18nStore();
    const undone = undoneAction as any;

    const reason = undone.reason;
    if (!reason) {
      return;
    }

    let message = "";
    if (!(t.value as any)[reason]) {
      logWarn(`translation for the undo reason "${reason}" was not found`);
      message = reason;
    } else {
      message =
        reason === UserNotFound
          ? t.value.userNotFound({
              phone: undone.action.payload.phone,
            })
          : (t.value as any)[reason];
    }

    /**
     * TODO: user should be able to retry certain actions in case of error.
     *
     * For example, "Wrong password" error shouldn't have the retry ability
     * because it doesn't make sense.
     * However, when user creates a dish with description, photo, etc.,
     * optimistic UI shows an update, but the server encounters an error during
     * saving changes to the database. In this case, client will see how the dish
     * disappears and they would be forced to enter the data once again just to try again.
     *
     * The retry should be available only for the user that created this action,
     * other clients that received this action via resend should simply see how it gets undone
     *
     * ALTERNATIVE solution: pessimistic UI
     * For each mutation, create two actions, for example: "dishes/create" and "dishes/created".
     * First will just send action to the server. The server will update DB.
     * If successfull, the server will call `.process` with "dishes/created".
     * The "dishes/created" will be resent to all clients. Clients will listed to it and update UI.
     * When processing "dishes/create", the client will see a loader.
     * Do not forget to send "logux/processed" manually for the first action.
     *
     * Logux recommends the first approach (Optimistic UI) for when a user changes data
     * (save the form, press the like button).
     * I think I will use the second approach for operations that are impossible to implement
     * with Optimistic UI, such as Login or Payment
     */
    const canRetry = false;
    const timeout = canRetry ? 1000000000 : 6000;
    const buttons = canRetry
      ? [
          {
            label: "Retry",
            color: "yellow",
            handler: () => {
              logInfo("retry:", undone.action);
              Store.commit
                .sync(undone.action)
                .then(() => {
                  logInfo("retry success:", undone.action);
                })
                .catch(() => {
                  logError("retry error:", undone.action);
                });
            },
          },
          {
            label: "Dismiss",
            color: "white",
            handler: () => {
              /* */
            },
          },
        ]
      : undefined;

    Notify.create({
      type: "negative",
      position: "top",
      timeout: timeout,
      message: message,
      multiLine: true,
      group: false,
      actions: buttons,
    });
  });

  Store.client.node.catch((err) => {
    logError(err);
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
