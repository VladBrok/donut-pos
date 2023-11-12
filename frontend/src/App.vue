<template>
  <router-view />
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { ANONYMOUS } from "donut-shared/src/constants";
import { useStore } from "src/store";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useMutationsWatcher } from "./lib/composables/useMutationsWatcher";

useMutationsWatcher();
const store = useStore();
const userId = ref(store.state.auth.user.userId);
const channels = computed(() => {
  return userId.value === ANONYMOUS.userId
    ? []
    : [`counter`, `users/${userId.value}`];
});
let isSubscribing = useSubscription(channels, { store: store as any });
const unsubscribe = ref(() => {
  /* */
});

onMounted(() => {
  unsubscribe.value = store.client.on("user", (newId) => {
    userId.value = newId;
  });
});

onUnmounted(() => {
  unsubscribe.value();
});
</script>
