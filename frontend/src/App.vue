<template>
  <router-view />
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { ANONYMOUS } from "donut-shared/src/constants";
import { useStore } from "src/store";
import { computed } from "vue";
import { useMutationsWatcher } from "./lib/composables/useMutationsWatcher";

useMutationsWatcher();

const store = useStore();
const userId = computed(() => store.state.auth.user.userId);
const channels = computed(() =>
  userId.value === ANONYMOUS.userId ? [] : [`counter`, `users/${userId.value}`]
);
let isSubscribing = useSubscription(channels, { store: store as any });
</script>
