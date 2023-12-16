<template>
  <div>
    <big-spinner v-if="isSubscribing" />
    <div v-else>
      <div class="q-mb-lg max-w-sm">
        <q-input
          class="bg-white"
          outlined
          v-model="searchInput"
          :placeholder="t.searchOrders"
          clearable
        >
          <template v-slot:append>
            <q-icon v-if="!searchInput?.length" name="search" />
          </template>
        </q-input>
      </div>
      <div class="q-mb-lg gap-sm row">
        <filter-pill
          v-for="orderStatus in orderFilters"
          :key="orderStatus"
          :id="orderStatus"
          :name="t[`orderStatus_${orderStatus}`]"
          :selected-id="selectedOrderStatus"
          @click="handleFilterChange(orderStatus)"
        >
        </filter-pill>
      </div>
      <div>
        <q-table
          class="max-w-lg shadow-0"
          :rows="ordersPage"
          :columns="columns"
          :loading="isUpdatingPage"
          row-key="id"
          :rows-per-page-label="t.perPage"
          :rows-per-page-options="[]"
          binary-state-sort
          :filter="selectedOrderStatus"
          v-model:pagination="pagination"
          @request="updatePage"
        >
          <!-- @row-click="
        (_, row) => $router.push(`/admin/dish-categories/update/${row.id}`)
      " -->
          <template v-slot:body-cell-index="props">
            <q-td :props="props">
              {{ props.rowIndex + 1 }}
            </q-td>
          </template>
          <template v-slot:no-data>
            <no-data></no-data>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { ANONYMOUS } from "donut-shared";
import BigSpinner from "src/components/BigSpinner.vue";
import FilterPill from "src/components/FilterPill.vue";
import NoData from "src/components/NoData.vue";
import { ROWS_PER_TABLE_PAGE } from "src/lib/constants";
import { getOrderCurrentStatus } from "src/lib/get-order-current-status";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "src/store";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { loadOrdersPageAction } from "../../../../shared/src/actions/orders";
import { ORDER_STATUSES_ARR } from "../../../../shared/src/constants";
import { logInfo } from "../../../../shared/src/lib/log";

// TODO: search by order number - debounce

const store = useStore();
const t = useI18nStore();
const ordersPage = computed(() => store.state.orders.ordersPage);
const userId = ref(store.state.auth.user.userId);
const channels = computed(() => {
  return userId.value === ANONYMOUS.userId ? [] : [`orders/${userId.value}`];
});
let isSubscribing = useSubscription(channels, { store: store as any });
const unsubscribe = ref(() => {
  /* */
});

type OrderStatusFilter = (typeof ORDER_STATUSES_ARR)[number] | "all";
const orderFilters = computed<OrderStatusFilter[]>(() => [
  "all",
  ...ORDER_STATUSES_ARR,
]);
const searchInput = ref<string | null>(null);
const isUpdatingPage = ref(false);
const selectedOrderStatus = ref<OrderStatusFilter>("all");
const pagination = ref({
  page: 1,
  rowsPerPage: ROWS_PER_TABLE_PAGE,
  rowsNumber: ROWS_PER_TABLE_PAGE,
});

const columns: any[] = [
  {
    name: "orderNumber",
    label: t.value.orderNumber,
    align: "left",
    field: "orderNumber",
  },
  {
    name: "tableNumber",
    label: t.value.tableNumber,
    align: "left",
    field: "tableNumber",
  },
  {
    name: "status",
    label: t.value.orderStatus,
    align: "left",
    field: getOrderCurrentStatus,
  },
];

const stopWatchingSubscribing = watch(isSubscribing, () => {
  if (!isSubscribing.value) {
    pagination.value.rowsNumber = store.state.orders.totalOrders;
  }
  stopWatchingSubscribing();
});

onMounted(() => {
  unsubscribe.value = store.client.on("user", (newId) => {
    userId.value = newId;
  });
});

onUnmounted(() => {
  unsubscribe.value();
});

const handleFilterChange = (orderStatus: OrderStatusFilter) => {
  selectedOrderStatus.value = orderStatus;
};

const updatePage = ({ pagination: { page } }: any) => {
  isUpdatingPage.value = true;
  store.commit
    .sync(
      loadOrdersPageAction({
        page: page,
        status:
          selectedOrderStatus.value === "all"
            ? undefined
            : selectedOrderStatus.value,
      })
    )
    .then(() => {
      logInfo("loaded", store.state.orders.totalOrders);
      pagination.value.page = page;
      pagination.value.rowsNumber = store.state.orders.totalOrders;
    })
    .finally(() => {
      isUpdatingPage.value = false;
    });
};
</script>
