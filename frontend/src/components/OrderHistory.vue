<template>
  <q-timeline>
    <q-timeline-entry
      v-for="(status, i) of statuses"
      :key="i"
      :title="t[`orderStatus_${status.name}`]"
      :subtitle="formatDateTimeReadable(status.date)"
      :color="status.name"
    >
    </q-timeline-entry>
  </q-timeline>
</template>

<script setup lang="ts">
import { IOrder } from "donut-shared/src/actions/orders";
import { ORDER_STATUSES, OrderStatus } from "donut-shared/src/constants";
import { formatDateTimeReadable, sortByDate } from "src/lib/date";
import { useI18nStore } from "src/lib/i18n";
import { computed } from "vue";

const props = defineProps<{
  order: IOrder;
}>();

const statuses = computed(() => {
  const order = props.order;
  const allPossible: [string, OrderStatus][] = [
    [order.createdDate, ORDER_STATUSES.CREATED],
    [order.cookingDate, ORDER_STATUSES.COOKING],
    [order.cookedDate, ORDER_STATUSES.COOKED],
    [order.deliveringDate, ORDER_STATUSES.DELIVERING],
    [order.deliveredDate, ORDER_STATUSES.DELIVERED],
    [order.paidDate, ORDER_STATUSES.PAID],
  ];
  const actual = allPossible.filter((x) => Boolean(x[0]));
  const sorted = sortByDate(actual, (x) => x[0]);
  return sorted.map((x) => ({
    date: x[0],
    name: x[1],
  }));
});

const t = useI18nStore();
</script>
