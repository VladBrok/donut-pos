import { LoguxVuexStore } from "@logux/vuex";
import { logoutAction } from "donut-shared/src/actions/auth";
import { logError } from "donut-shared/src/lib/log";

export function setErrorHandler(Store: LoguxVuexStore) {
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
}
