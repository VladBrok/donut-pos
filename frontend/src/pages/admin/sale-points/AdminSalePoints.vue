<template>
  <div>
    <big-spinner v-if="isSubscribing" />
    <q-table
      v-else
      class="q-mx-auto max-w-xl sticky-last-column-table"
      :rows="salePointsFiltered"
      :columns="columns"
      row-key="id"
      binary-state-sort
      :rows-per-page-label="t.perPage"
      :loading="isDeleting"
      :pagination="{
        rowsPerPage: ROWS_PER_TABLE_PAGE,
      }"
    >
      <template v-slot:top-right>
        <q-input
          dense
          v-model="searchInput"
          :placeholder="t.search"
          class="q-mr-lg q-my-sm"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          color="primary"
          icon="add"
          :label="t.addSalePoint"
          to="/admin/sale-points/create"
        />
      </template>
      <template v-slot:body-cell-index="props">
        <q-td :props="props">
          {{ props.rowIndex + 1 }}
        </q-td>
      </template>
      <template v-slot:body-cell-isDefault="props">
        <q-td :props="props">
          <q-radio
            class="disabled-cursor-default"
            :model-value="'true'"
            checked-icon="task_alt"
            unchecked-icon="close"
            :val="props.row.isDefault.toString()"
            label=""
            disable
            :color="props.row.isDefault ? 'positive' : 'negative'"
            keep-color
          />
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" auto-width>
          <q-btn
            flat
            size="md"
            icon="mode_edit"
            color="primary"
            dense
            class="q-mr-sm"
            @click.stop
            :to="`/admin/sale-points/update/${props.row.id}`"
          >
          </q-btn>
          <q-btn
            flat
            size="md"
            icon="o_delete"
            color="negative"
            dense
            @click.stop="onDeleteAttempt(props.row)"
          >
          </q-btn>
        </q-td>
      </template>
      <template v-slot:no-data>
        <no-data />
      </template>
    </q-table>

    <confirm-dialog
      :model-value="!!confirmDelete"
      @update:model-value="confirmDelete = null"
    >
      <template #body>
        {{ t.confirmSalePointDelete }}
        <span class="text-weight-bold">"{{ confirmDelete?.name || "" }}"</span>?
      </template>
      <template #confirmButton>
        <q-btn
          flat
          :label="t.deleteButton"
          color="negative"
          @click="onDeleteConfirmed"
        />
      </template>
    </confirm-dialog>
  </div>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import {
  CHANNELS,
  IAddress,
  ISalePoint,
  assert,
  deleteSalePointAction,
} from "donut-shared";
import { Notify } from "quasar";
import { formatAddress } from "src/lib/address";
import { formatPhoneNumber } from "src/lib/phone";
import { useStore } from "src/store";
import { computed, ref } from "vue";
import BigSpinner from "../../../components/BigSpinner.vue";
import ConfirmDialog from "../../../components/ConfirmDialog.vue";
import NoData from "../../../components/NoData.vue";
import {
  ROWS_PER_TABLE_PAGE,
  SUCCESS_TIMEOUT_MS,
} from "../../../lib/constants";
import { createFuzzySearcher } from "../../../lib/fuzzy-search";
import { useI18nStore } from "../../../lib/i18n";

const store = useStore();
const salePoints = computed(() => store.state.salePoints.salePoints);
const fuzzySearch = computed(() =>
  createFuzzySearcher(salePoints.value, [
    "name",
    "phone",
    "email",
    "isDefault",
    "address.city",
    "address.street",
    "address.homeNumber",
    "address.postalCode",
  ])
);
const salePointsFiltered = computed(() =>
  fuzzySearch.value.search(searchInput.value)
);
const channels = computed(() => {
  return [CHANNELS.SALE_POINTS];
});
let isSubscribing = useSubscription(channels, { store: store as any });
const t = useI18nStore();
const confirmDelete = ref<null | ISalePoint>(null);
const isDeleting = ref(false);
const searchInput = ref("");

const columns: any[] = [
  {
    name: "index",
    label: "#",
    field: "index",
    align: "center",
  },
  {
    name: "name",
    label: t.value.name,
    align: "center",
    field: "name",
    sortable: true,
  },
  {
    name: "address",
    label: t.value.address,
    align: "center",
    field: "address",
    format: (x: IAddress) => formatAddress(x),
  },
  {
    name: "phone",
    label: t.value.phone,
    align: "center",
    field: "phone",
    format: (val: string) => formatPhoneNumber(val),
  },
  {
    name: "email",
    label: t.value.email,
    align: "center",
    field: "email",
  },
  {
    name: "isDefault",
    label: t.value.isDefault,
    align: "center",
    field: "isDefault",
  },
  { name: "actions", label: "", align: "right" },
];

const onDeleteAttempt = (row: ISalePoint) => {
  confirmDelete.value = row;
};

const onDeleteConfirmed = () => {
  assert(confirmDelete.value, "");
  const toDelete = confirmDelete.value.id;
  confirmDelete.value = null;
  isDeleting.value = true;
  store.commit
    .sync(
      deleteSalePointAction({
        id: toDelete,
      })
    )
    .then(() => {
      Notify.create({
        type: "positive",
        position: "top",
        timeout: SUCCESS_TIMEOUT_MS,
        message: t.value.deleteSuccess,
        multiLine: true,
        group: false,
      });
    })
    .finally(() => {
      isDeleting.value = false;
    });
};
</script>
