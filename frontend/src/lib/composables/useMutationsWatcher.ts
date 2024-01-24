import {
  ANONYMOUS,
  addDishToCurrentOrderAction,
  assert,
  cashPaymentRequestedAction,
  clearCurrentOrderAction,
  decrementDishInCurrentOrderAction,
  openWelcomeBannerAction,
  orderCreatedAction,
  removeDishFromCurrentOrderAction,
  updateCurrentOrderCommentAction,
  updateCurrentOrderTableNumberAction,
} from "donut-shared";
import { loggedInAction, logoutAction } from "donut-shared/src/actions/auth";
import {
  updateCurrentOrderAddressAction,
  updateCurrentOrderClientFirstNameAction,
  updateCurrentOrderClientPhoneAction,
  updateCurrentOrderTypeAction,
  updatePreviousOrderAction,
} from "donut-shared/src/actions/current-order";
import {
  ICookedDish,
  dishFinishedCookingAction,
  orderCookedAction,
} from "donut-shared/src/actions/orders";
import { Notify } from "quasar";
import { INFO_TIMEOUT_MS, SUCCESS_TIMEOUT_MS } from "src/lib/constants";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "src/store";
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  Keys,
  getUserFromStorage,
  removeItem,
  saveCurrentOrderToStorage,
  saveUserToStorage,
} from "../local-storage";

/**
 * Setup listener that executes side effects when specific mutation happens
 * @description
 * Store mutations should be pure. Side-effects related to mutations should be executed here
 */
export const useMutationsWatcher = () => {
  const store = useStore();
  const unsubscribe = ref<() => void>();
  const router = useRouter();
  const t = useI18nStore();

  onMounted(() => {
    unsubscribe.value = store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case loggedInAction.type: {
          saveUserToStorage(state.auth.user);
          if (mutation.payload.payload.isNewUser) {
            setTimeout(() => {
              store.commit.crossTab(openWelcomeBannerAction());
            }, 100);
          }
          break;
        }

        case logoutAction.type: {
          const role = getUserFromStorage()?.role?.codeName;
          const redirectTo = `${
            !role ? "" : role === "cook" ? "/kitchen" : role
          }/login`;
          removeItem(Keys.User);
          store.client.changeUser(ANONYMOUS.userId);
          router.push(redirectTo);
          break;
        }

        // TODO: change to if(startsWith("currentOrder")); check before it that it's ok
        case addDishToCurrentOrderAction.type:
        case updateCurrentOrderCommentAction.type:
        case updateCurrentOrderTableNumberAction.type:
        case removeDishFromCurrentOrderAction.type:
        case updateCurrentOrderTypeAction.type:
        case decrementDishInCurrentOrderAction.type:
        case updateCurrentOrderAddressAction.type:
        case updateCurrentOrderClientFirstNameAction.type:
        case updateCurrentOrderClientPhoneAction.type: {
          saveCurrentOrderToStorage(state.currentOrder.order);
          break;
        }

        case clearCurrentOrderAction.type: {
          saveCurrentOrderToStorage(null);
          break;
        }

        case orderCookedAction.type: {
          if (store.state.auth.user?.permissions?.courier) {
            Notify.create({
              type: "positive",
              position: "top",
              timeout: SUCCESS_TIMEOUT_MS,
              message: t.value.newOrderForCourier({
                orderNumber: mutation.payload.payload.order.order.orderNumber,
              }),
              multiLine: true,
              group: false,
            });
            return;
          }

          Notify.create({
            type: "positive",
            position: "top",
            timeout: SUCCESS_TIMEOUT_MS,
            message: t.value.orderIsReady({
              orderNumber: mutation.payload.payload.order.order.orderNumber,
            }),
            multiLine: true,
            group: false,
          });
          break;
        }

        case cashPaymentRequestedAction.type: {
          Notify.create({
            type: "info",
            position: "top",
            timeout: INFO_TIMEOUT_MS,
            message: t.value.cashPaymentRequested({
              orderNumber: mutation.payload.payload.request.orderNumber,
              table: mutation.payload.payload.request.table.number,
            }),
            multiLine: true,
            group: false,
          });
          break;
        }

        case orderCreatedAction.type: {
          if (store.state.auth.user?.permissions?.client) {
            store.commit.crossTab(
              updatePreviousOrderAction({
                order: mutation.payload.payload.order,
              })
            );
            break;
          }

          if (store.state.auth.user?.permissions?.cook) {
            Notify.create({
              type: "info",
              position: "top",
              timeout: INFO_TIMEOUT_MS,
              message: t.value.orderCreated({
                orderNumber: mutation.payload.payload.order.orderNumber,
              }),
              multiLine: true,
              group: false,
            });
          }
          break;
        }

        case dishFinishedCookingAction.type: {
          if (state.auth.user.role?.codeName !== "waiter") {
            return;
          }

          const cooked: ICookedDish = mutation.payload.payload.cookedDish;
          Notify.create({
            type: "info",
            position: "top",
            timeout: INFO_TIMEOUT_MS,
            message: t.value.dishCooked({
              dishName: cooked.dish.name,
              table: cooked.order.table.number,
            }),
            multiLine: true,
            group: false,
          });
          break;
        }
      }
    });
  });

  onUnmounted(() => {
    assert(unsubscribe.value, "subscription to store mutations was not set");
    unsubscribe.value();
  });
};
