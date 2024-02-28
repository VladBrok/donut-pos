import { clearCurrentOrderAction, createOrderAction } from "donut-shared";
import { updateCreateOrderAfterAuthAction } from "donut-shared/src/actions/orders";
import { logError } from "donut-shared/src/lib/log";
import { Notify } from "quasar";
import { SUCCESS_TIMEOUT_MS } from "src/lib/constants";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "../store";

export function createOrder(
  store: ReturnType<typeof useStore>,
  t: ReturnType<typeof useI18nStore>
) {
  const user = store.state.auth.user;
  const order = store.state.currentOrder.order;

  if (!order) {
    logError("tried to create an order when currentOrder is empty.");
    return Promise.resolve();
  }

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

export function createOrderAfterAuth(
  store: ReturnType<typeof useStore>,
  t: ReturnType<typeof useI18nStore>
) {
  store.commit.crossTab(
    updateCreateOrderAfterAuthAction({
      value: false,
    })
  );

  return createOrder(store, t)?.then(() => {
    const url = new URL("/menu", window.location.origin);
    window.location.href = url.toString();
  });
}
