<template>
  <div>
    <big-spinner v-if="isSubscribing"></big-spinner>
    <div v-else>
      <apexchart
        width="380"
        type="donut"
        :options="options"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { CHANNELS, ORDER_TYPES_ARR } from "donut-shared";
import BigSpinner from "src/components/BigSpinner.vue";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "src/store";
import { computed } from "vue";

const store = useStore();
const channels = computed(() => {
  return [CHANNELS.ADMIN_DASHBOARD];
});
const isSubscribing = useSubscription(channels, { store: store as any });
const data = computed(() => store.state.dashboard.data);
const t = useI18nStore();
const orderTypes = computed(() => {
  const res = ORDER_TYPES_ARR.map((x) => ({
    label: t.value[`orderType_${x}`],
    value: data.value.orderTypes.find((type) => type.type === x)?.count || 0,
  }));
  return res;
});
const options = computed(() => ({
  labels: orderTypes.value.map((x) => x.label),
}));
const series = computed(() => orderTypes.value.map((x) => x.value));
</script>
