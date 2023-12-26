import {
  ANONYMOUS,
  addDishToCurrentOrderAction,
  assert,
  clearCurrentOrderAction,
  decrementDishInCurrentOrderAction,
  orderCreatedAction,
  removeDishFromCurrentOrderAction,
  updateCurrentOrderCommentAction,
  updateCurrentOrderTableNumberAction,
} from "donut-shared";
import { loggedInAction, logoutAction } from "donut-shared/src/actions/auth";
import {
  ICookedDish,
  dishFinishedCookingAction,
} from "donut-shared/src/actions/orders";
import { Notify } from "quasar";
import { INFO_TIMEOUT_MS } from "src/lib/constants";
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
          break;
        }

        case logoutAction.type: {
          const role = getUserFromStorage()?.role.codeName;
          const redirectTo = `/${role === "cook" ? "kitchen" : role}/login`;
          removeItem(Keys.User);
          store.client.changeUser(ANONYMOUS.userId);
          router.push(redirectTo);
          break;
        }

        case addDishToCurrentOrderAction.type:
        case updateCurrentOrderCommentAction.type:
        case updateCurrentOrderTableNumberAction.type:
        case removeDishFromCurrentOrderAction.type:
        case decrementDishInCurrentOrderAction.type: {
          saveCurrentOrderToStorage(state.currentOrder.order);
          break;
        }

        case clearCurrentOrderAction.type: {
          saveCurrentOrderToStorage(null);
          break;
        }

        case orderCreatedAction.type: {
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
              table: cooked.order.tableNumber,
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
