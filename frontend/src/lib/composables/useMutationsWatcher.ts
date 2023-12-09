import {
  addDishToCurrentOrderAction,
  assert,
  clearCurrentOrderAction,
} from "donut-shared";
import { loggedInAction, logoutAction } from "donut-shared/src/actions/auth";
import { ANONYMOUS } from "donut-shared/src/constants";
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

  onMounted(() => {
    unsubscribe.value = store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case loggedInAction.type: {
          saveUserToStorage(state.auth.user);
          break;
        }

        case logoutAction.type: {
          const redirectTo = `/${getUserFromStorage()?.role.codeName}/login`;
          removeItem(Keys.User);
          store.client.changeUser(ANONYMOUS.userId);
          router.push(redirectTo);
          break;
        }

        case addDishToCurrentOrderAction.type: {
          saveCurrentOrderToStorage(state.currentOrder.order);
          break;
        }

        case clearCurrentOrderAction.type: {
          saveCurrentOrderToStorage(null);
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
