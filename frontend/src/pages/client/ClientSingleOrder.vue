<template>
  <div class="q-pa-md bg-gray-lightest min-height-window">
    <div class="q-mx-auto max-w-lg">
      <back-button />
      <big-spinner v-if="isSubscribing" />
      <div v-else-if="order">
        <h1 class="text-h4">
          <order-number-title :order-number="order.orderNumber" />
        </h1>
        <order-details-view :order="order" full-screen />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { CHANNELS } from "donut-shared";
import BackButton from "src/components/BackButton.vue";
import BigSpinner from "src/components/BigSpinner.vue";
import OrderDetailsView from "src/components/OrderDetailsView.vue";
import OrderNumberTitle from "src/components/OrderNumberTitle.vue";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "src/store";
import { computed, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const t = useI18nStore();
const orderNumber = computed(
  () => router.currentRoute.value.params.orderNumber
);
const order = computed(() => store.state.orders.order);
const store = useStore();
const channels = computed(() => {
  return [CHANNELS.ORDER_SINGLE(orderNumber.value?.toString())];
});
let isSubscribing = useSubscription(channels, { store: store as any });

watch(isSubscribing, () => {
  if (!isSubscribing.value && order.value == null) {
    router.push("/404");
  }
});
</script>
