<template>
  <div>
    <big-spinner v-if="isSubscribing" />
    <div v-else>
      <div class="q-mb-lg max-w-sm">
        <q-input
          class="bg-white"
          outlined
          v-model="searchInput"
          debounce="500"
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
          v-for="filter in statusFilters"
          :key="filter"
          :id="filter"
          :name="t[`orderStatus_${filter}`]"
          :selected-id="selectedOrderStatus"
          @click="handleStatusFilterChange(filter)"
        >
        </filter-pill>
      </div>
      <div>
        <q-table
          class="max-w-lg q-pa-sm"
          :rows="ordersPage"
          :columns="columns"
          :loading="isUpdatingPage"
          row-key="id"
          :rows-per-page-label="t.perPage"
          :rows-per-page-options="[]"
          :filter="tableFilter"
          v-model:pagination="pagination"
          @request="updatePage"
          @row-click="(_, row) => (selectedOrder = row)"
        >
          <template v-slot:no-data>
            <no-data></no-data>
          </template>
        </q-table>
      </div>
    </div>
  </div>

  <q-drawer
    :model-value="Boolean(selectedOrder)"
    @update:model-value="selectedOrder = null"
    side="right"
    bordered
    :width="$q.screen.xs ? 320 : 400"
  >
    <div class="q-pa-sm">
      <div class="row justify-between q-mb-md q-mt-sm">
        <div>
          <p class="text-h5">
            {{ `${t.order} ${selectedOrder?.orderNumber}` }}
          </p>
          <p v-if="selectedOrder" class="text-h6 text-weight-regular">
            {{
              `${t.orderStatus.toLowerCase()}: ${getOrderCurrentStatus(
                selectedOrder
              )}`
            }}
          </p>
        </div>
        <div>
          <q-btn dense flat round icon="close" @click="selectedOrder = null" />
        </div>
      </div>
      <div class="q-px-sm">
        <order-details-view v-if="selectedOrder" :order="selectedOrder">
        </order-details-view>
      </div>
    </div>
  </q-drawer>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { ANONYMOUS } from "donut-shared";
import BigSpinner from "src/components/BigSpinner.vue";
import FilterPill from "src/components/FilterPill.vue";
import NoData from "src/components/NoData.vue";
import OrderDetailsView from "src/components/OrderDetailsView.vue";
import { ROWS_PER_TABLE_PAGE } from "src/lib/constants";
import { formatCurrency } from "src/lib/currency";
import { useI18nStore } from "src/lib/i18n";
import { getOrderCurrentStatus, getOrderTotalCost } from "src/lib/order";
import { useStore } from "src/store";
import { IOrdersState } from "src/store/orders/state";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { loadOrdersPageAction } from "../../../../shared/src/actions/orders";
import { ORDER_STATUSES_ARR } from "../../../../shared/src/constants";

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
const statusFilters = computed<OrderStatusFilter[]>(() => [
  "all",
  ...ORDER_STATUSES_ARR,
]);
const searchInput = ref<string | null>(null);
const isUpdatingPage = ref(false);
const selectedOrderStatus = ref<OrderStatusFilter>("created");
const tableFilter = computed(
  () => selectedOrderStatus.value + searchInput.value
);
const pagination = ref({
  page: 1,
  rowsPerPage: ROWS_PER_TABLE_PAGE,
  rowsNumber: ROWS_PER_TABLE_PAGE,
});
const selectedOrder = ref<IOrdersState["ordersPage"][number] | null>(null);

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
    name: "dishCount",
    label: t.value.dishCount,
    align: "left",
    field: (row: IOrdersState["ordersPage"][number]) => row.dishes.length,
  },
  {
    name: "total",
    label: t.value.total,
    align: "left",
    field: (row: IOrdersState["ordersPage"][number]) =>
      formatCurrency(getOrderTotalCost(row.dishes), false),
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
    stopWatchingSubscribing();
  }
});

onMounted(() => {
  unsubscribe.value = store.client.on("user", (newId) => {
    userId.value = newId;
  });
});

onUnmounted(() => {
  unsubscribe.value();
});

const handleStatusFilterChange = (orderStatus: OrderStatusFilter) => {
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
        orderNumber: searchInput.value || undefined,
      })
    )
    .then(() => {
      pagination.value.page = page;
      pagination.value.rowsNumber = store.state.orders.totalOrders;
    })
    .finally(() => {
      isUpdatingPage.value = false;
    });
};
</script>
