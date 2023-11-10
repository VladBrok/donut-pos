<template>
  <router-view />
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { useStore } from "src/store";
import { computed, ref, watch } from "vue";
import { ANONYMOUS } from "./store/auth/state";

const store = useStore();
const userId = computed(() => store.state.auth.user.userId);
const userIdForChannel = ref(userId.value);
const channels = computed(() =>
  userIdForChannel.value === ANONYMOUS.userId
    ? []
    : [`counter`, `users/${userIdForChannel.value}`]
);
let isSubscribing = useSubscription(channels, { store: store as any });

// TODO: this watch was made because when userId changes in store, channels computed
// changes immediately, but instead we need to wait until userId of the logux client
// will change using changeUser
watch(userId, async () => {
  if (store.client.options.userId === userId.value) {
    userIdForChannel.value = userId.value;
    return;
  }

  let unsubscribe = store.client.on("user", () => {
    userIdForChannel.value = userId.value;
    unsubscribe();
  });
});
</script>
