<template>
  <router-view />
</template>

<script setup lang="ts">
import { useMutationsWatcher } from "./lib/composables/useMutationsWatcher";

useMutationsWatcher();

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
