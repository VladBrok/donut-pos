<template>
  <router-view />
  <div>
    <q-toggle v-model="drawerState" />
  </div>
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
import { useStore } from "src/store";
import { computed } from "vue";

const $store = useStore();

console.log("getters:", $store.getters["counter/count"]);

const count = computed(() => $store.state.counter.count);

const drawerState = computed({
  get: () => {
    console.log("get", $store.state.showcase.isDrawerOpen);
    return $store.state.showcase.isDrawerOpen;
  },
  set: (val) => {
    console.log("set", val);
    $store.commit("showcase/updateIsOpen", val);
  },
});

const increment = () => {
  $store.commit("counter/increment");
};

const decrement = () => {
  $store.commit("counter/decrement");
};

const incrementAsync = () => {
  $store.dispatch("counter/increment");
};
</script>
