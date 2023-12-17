<template>
  <!-- TODO: use different colors for each status -->
  <q-timeline color="secondary">
    <q-timeline-entry
      v-for="status of statuses"
      :key="status.codeName"
      :title="t[`orderStatus_${status.codeName}`]"
      :subtitle="formatDateTimeReadable(status.date)"
    >
    </q-timeline-entry>
  </q-timeline>
</template>

<script setup lang="ts">
import { formatDateTimeReadable, sortByDate } from "src/lib/date";
import { useI18nStore } from "src/lib/i18n";
import { computed } from "vue";
import { OrderStatus } from "../../../shared/src/constants";

const props = defineProps<{
  statuses: {
    id: string;
    codeName: OrderStatus;
    date: string;
  }[];
}>();

const statuses = computed(() =>
  sortByDate(props.statuses, (status) => status.date)
);

const t = useI18nStore();
</script>
