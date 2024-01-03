import {
  ICurrentOrder,
  clearCurrentOrderAction,
  createOrderAction,
} from "donut-shared";
import { Notify } from "quasar";
import { SUCCESS_TIMEOUT_MS } from "src/lib/constants";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "../store";

export function createOrder(
  store: ReturnType<typeof useStore>,
  order: ICurrentOrder,
  t: ReturnType<typeof useI18nStore>
) {
  const user = store.state.auth.user;
  return store.commit
    .sync(
      createOrderAction({
        order: order,
        isClient: user.permissions?.client || false,
      })
    )
    .then(() => {
      Notify.create({
        type: "positive",
        position: "top",
        timeout: SUCCESS_TIMEOUT_MS,
        message: t.value.orderCreateSuccess,
        multiLine: true,
        group: false,
      });

      store.commit.crossTab(clearCurrentOrderAction());
    });
}
