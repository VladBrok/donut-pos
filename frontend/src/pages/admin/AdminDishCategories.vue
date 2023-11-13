<template>
  {{ isSubscribing }}
  <div>
    dish categories:
    <pre>{{
      JSON.stringify(store.state.dishCategories.categories, undefined, 4)
    }}</pre>
  </div>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { CHANNELS } from "donut-shared";
import { useStore } from "src/store";
import { computed } from "vue";

const store = useStore();
const channels = computed(() => {
  return [CHANNELS.DISH_CATEGORIES];
});
let isSubscribing = useSubscription(channels, { store: store as any });
</script>
