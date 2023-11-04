<template>
  <h1>dashboard</h1>
  <q-btn
    outline
    color="negative"
    label="Logout"
    icon="logout"
    @click="logout"
  />
  <pre>
    {{ JSON.stringify(user, undefined, 4) }}
  </pre>
</template>

<script setup lang="ts">
import { log } from "donut-shared";
import { useStore } from "src/store";
import { computed } from "vue";

const store = useStore();
const user = computed(() => store.state.auth);

const logout = () => {
  log("logout");
};
</script>
