<template>
  <router-view />
  <div>
    <q-toggle v-model="drawerState" />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "src/store";
import { computed } from "vue";

const $store = useStore();

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
</script>
