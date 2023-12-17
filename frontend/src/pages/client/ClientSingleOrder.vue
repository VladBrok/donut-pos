<template>
  <div class="q-pa-md bg-gray-lightest min-height-window">
    <div class="q-mx-auto max-w-lg">
      <big-spinner v-if="isSubscribing" />
      <div v-else-if="order">
        <h1 class="text-h4">
          {{ `${t.order} #${order?.orderNumber}` }}
        </h1>
        <order-details-view :order="order" full-screen> </order-details-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import BigSpinner from "src/components/BigSpinner.vue";
import OrderDetailsView from "src/components/OrderDetailsView.vue";
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
  return [`singleOrder/${orderNumber.value}`];
});
let isSubscribing = useSubscription(channels, { store: store as any });

watch(isSubscribing, () => {
  if (!isSubscribing.value && order.value == null) {
    router.push("/404");
  }
});
</script>
