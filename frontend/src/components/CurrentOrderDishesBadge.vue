<template>
  <q-badge
    v-if="currentOrder"
    rounded
    floating
    color="red"
    :label="dishCount"
  />
</template>

<script setup lang="ts">
import { getDishesInOrderCount } from "donut-shared/src/lib/get-dishes-in-order-count";
import { ADD_TO_CART_ANIMATION_DURATION_MS } from "src/lib/constants";
import { useStore } from "src/store";
import { computed, ref, watch } from "vue";

const store = useStore();
const currentOrder = computed(() => store.state.currentOrder.order);
const dishCount = ref<number | string>("");

watch(
  () => getDishesInOrderCount(currentOrder.value),
  () => {
    const count = getDishesInOrderCount(currentOrder.value);
    setTimeout(() => {
      dishCount.value = count || "";
    }, ADD_TO_CART_ANIMATION_DURATION_MS);
  },
  { immediate: true }
);
</script>
