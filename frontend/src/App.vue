<template>
  <router-view />
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { log } from "donut-shared";
import { LogType } from "donut-shared/src/log";
import { useStore } from "src/store";
import { computed } from "vue";
import { useMutationsWatcher } from "./lib/composables/useMutationsWatcher";
import { ANONYMOUS } from "./store/auth/state";

useMutationsWatcher();

const store = useStore();
const userId = computed(() => store.state.auth.user.userId);
const channels = computed(() =>
  userId.value === ANONYMOUS.userId ? [] : [`counter`, `users/${userId.value}`]
);
let isSubscribing = useSubscription(channels, { store: store as any });
log(LogType.Info, 1);
</script>
