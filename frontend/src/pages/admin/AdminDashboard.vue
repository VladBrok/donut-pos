<template>
  <h1>dashboard</h1>
  <pre>
    {{ JSON.stringify(user, undefined, 4) }}
  </pre>
</template>

<script setup lang="ts">
import { useStore } from "src/store";
import { computed } from "vue";

const $store = useStore();
const user = computed(() => $store.state.auth);
</script>
