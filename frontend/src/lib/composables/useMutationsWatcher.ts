import { assert, loggedInAction, logoutAction } from "donut-shared";
import { useStore } from "src/store";
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { ANONYMOUS } from "../../store/auth/state";
import { Keys, removeItem, saveUserToStorage } from "../local-storage";

/**
 * Setup listener that executes side effects when specific mutations happen
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
          store.client.changeUser(
            state.auth.user.userId || "",
            state.auth.user.accessToken || ""
          );
          router.push("/admin");
          break;
        }

        case logoutAction.type: {
          removeItem(Keys.User);
          store.client.changeUser(ANONYMOUS.userId);
          router.push("/admin/login");
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
