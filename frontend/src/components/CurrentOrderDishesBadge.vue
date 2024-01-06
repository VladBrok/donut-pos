<template>
  <q-badge
    v-if="currentOrder"
    rounded
    floating
    color="red"
    :label="currentOrder.dishes.length || ''"
  />
</template>

<script setup lang="ts">
import { useStore } from "src/store";
import { computed } from "vue";

const store = useStore();
const currentOrder = computed(() => store.state.currentOrder.order);
</script>
