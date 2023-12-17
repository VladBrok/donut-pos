<template>
  <div class="q-pa-md bg-gray-lightest min-height-window">
    <big-spinner v-if="isSubscribing" />
    <div v-else>
      {{ JSON.stringify(order, undefined, 4) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import BigSpinner from "src/components/BigSpinner.vue";
import { useStore } from "src/store";
import { computed, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const orderNumber = computed(
  () => router.currentRoute.value.params.orderNumber
);
const order = computed(() => store.state.orders.order);
const store = useStore();
const channels = computed(() => {
  return [`orders/${orderNumber.value}`];
});
let isSubscribing = useSubscription(channels, { store: store as any });

watch(isSubscribing, () => {
  if (!isSubscribing.value && order.value == null) {
    router.push("/404");
  }
});
</script>
