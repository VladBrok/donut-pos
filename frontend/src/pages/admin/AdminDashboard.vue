<template>
  <div>
    <big-spinner v-if="isSubscribing"></big-spinner>
    <div v-else class="row gap-lg">
      <dashboard-card class="flex-1">
        <template #title>
          {{ t.orderTypes }}
        </template>
        <template #content>
          <apexchart
            type="donut"
            :options="options"
            :series="series"
          ></apexchart>
        </template>
      </dashboard-card>
      <dashboard-card class="flex-1">
        <template #title>
          {{ t.orderCount }}
        </template>
        <template #content>
          <div
            class="text-center text-h3 text-weight-bold full-height row justify-center items-center q-pb-xl"
          >
            {{ data.orderCount }}
          </div>
        </template>
      </dashboard-card>
      <dashboard-card class="flex-1">
        <template #title>
          {{ t.clientCount }}
        </template>
        <template #content>
          <div
            class="text-center text-h3 text-weight-bold full-height row justify-center items-center q-pb-xl"
          >
            {{ data.clientCount }}
          </div>
        </template>
      </dashboard-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { CHANNELS, ORDER_TYPES_ARR } from "donut-shared";
import BigSpinner from "src/components/BigSpinner.vue";
import DashboardCard from "src/components/DashboardCard.vue";
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
  return ORDER_TYPES_ARR.map((x) => ({
    label: t.value[`orderType_${x}`],
    value: data.value.orderTypes.find((type) => type.type === x)?.count || 0,
  }));
});
const options = computed(() => ({
  labels: orderTypes.value.map((x) => x.label),
  responsive: [
    {
      breakpoint: 4000,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 300,
        },
      },
    },
  ],
}));
const series = computed(() => orderTypes.value.map((x) => x.value));
</script>
