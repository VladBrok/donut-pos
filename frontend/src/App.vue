<template>
  <router-view />
</template>

<script setup lang="ts">
import { debounce } from "quasar";
import { onMounted, onUnmounted } from "vue";
import { useMutationsWatcher } from "./lib/composables/useMutationsWatcher";

useMutationsWatcher();

const setCustomVh = debounce(() => {
  const doc = document.documentElement;
  doc.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
}, 100);

onMounted(() => {
  window.addEventListener("resize", setCustomVh);
  setCustomVh();
});

onUnmounted(() => {
  window.removeEventListener("resize", setCustomVh);
});

// TODO: it's an example of subscribing to the `users/:id` channel.

// const store = useStore();
// const userId = ref(store.state.auth.user.userId);
// const channels = computed(() => {
//   return userId.value === ANONYMOUS.userId ? [] : [`users/${userId.value}`];
// });
// let isSubscribing = useSubscription(channels, { store: store as any });
// const unsubscribe = ref(() => {
//   /* */
// });

// onMounted(() => {
//   unsubscribe.value = store.client.on("user", (newId) => {
//     userId.value = newId;
//   });
// });

// onUnmounted(() => {
//   unsubscribe.value();
// });
</script>
