<template>
  <router-view />
  <div></div>
  <div>
    <div>
      {{ count }}
    </div>
    <q-btn color="primary" @click="increment"> Increment </q-btn>
    <q-btn color="primary" @click="incrementAsync"> Increment Async </q-btn>
    <q-btn color="primary" @click="decrement"> Decrement </q-btn>
  </div>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { log } from "donut-shared";
import { useStore } from "src/store";
import { computed, onMounted, onUnmounted, watch, ref } from "vue";

const store = useStore();

const userId = computed(() => store.state.auth.user.userId);
const userIdForChannel = ref(userId.value);
const channels = computed(() => [`counter`, `users/${userIdForChannel.value}`]);
let isSubscribing = useSubscription(channels, { store: store as any });
console.log("isSubscribing:", isSubscribing.value);

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

const count = computed(() => store.state.counter.count);

const increment = () => {
  store.commit.sync("counter/increment", { amount: 5 });
};

const decrement = () => {
  store.commit.sync("counter/decrement");
};

const incrementAsync = () => {
  store.dispatch("counter/increment");
};
</script>
