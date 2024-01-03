import { ANONYMOUS } from "donut-shared";
import { useStore } from "src/store";
import { computed } from "vue";

export function useIsLoggedIn() {
  const store = useStore();
  return computed(() => store.state.auth.user.userId !== ANONYMOUS.userId);
}
