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
import { useStore } from "src/store";
import { computed, onMounted } from "vue";

const $store = useStore();

let channels = computed(() => [`counter`]);
let isSubscribing = useSubscription(channels, { store: $store as any });
console.log("isSubscribing:", isSubscribing.value);

const count = computed(() => $store.state.counter.count);

const increment = () => {
  $store.commit.sync("counter/increment", { amount: 5 });
};

const decrement = () => {
  $store.commit.sync("counter/decrement");
};

const incrementAsync = () => {
  $store.dispatch("counter/increment");
};
</script>
