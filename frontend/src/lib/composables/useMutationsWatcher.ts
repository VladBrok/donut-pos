import { assert, loggedInAction, loginAction } from "donut-shared";
import { useStore } from "src/store";
import { onMounted, onUnmounted, ref } from "vue";
import { saveUserToStorage } from "../local-storage";

/**
 * Setup listener that executes side effects when specific mutations happen
 * @description
 * Store mutations should be pure. Side-effects related to mutations should be executed here
 */
export const useMutationsWatcher = () => {
  const store = useStore();
  const unsubscribe = ref<() => void>();

  onMounted(() => {
    unsubscribe.value = store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case loggedInAction.type: {
          saveUserToStorage(mutation.payload);
          break;
        }
        case loginAction.type: {
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
