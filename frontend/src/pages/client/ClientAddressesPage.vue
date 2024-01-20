<template>
  <div>
    <big-spinner v-if="isSubscribing" />
    <q-table
      v-else
      class="q-mx-auto max-w-lg sticky-last-column-table"
      :rows="filtered"
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
        <!-- TODO: open modal on click -->
        <q-btn color="primary" icon="add" :label="t.addAddress" />
      </template>
      <template v-slot:body-cell-index="props">
        <q-td :props="props">
          {{ props.rowIndex + 1 }}
        </q-td>
      </template>
      <template v-slot:body-cell-image="props">
        <q-td :props="props">
          <q-img
            :src="props.row.imageUrl"
            fit="cover"
            class="rounded-borders image-sm"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-active="props">
        <q-td :props="props">
          <q-radio
            class="disabled-cursor-default"
            :model-value="'true'"
            checked-icon="task_alt"
            unchecked-icon="close"
            :val="props.row.isActive.toString()"
            label=""
            disable
            :color="props.row.isActive ? 'positive' : 'negative'"
            keep-color
          />
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" auto-width>
          <!-- TODO: open modal on click -->
          <q-btn
            flat
            size="md"
            icon="mode_edit"
            color="primary"
            dense
            class="q-mr-sm"
            @click.stop
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
        <no-data></no-data>
      </template>
    </q-table>

    <confirm-dialog
      :model-value="!!confirmDelete"
      @update:model-value="confirmDelete = null"
    >
      <template #body>
        {{ t.confirmAddressDelete }}
        <span class="text-weight-bold"
          >"{{ formatAddress(confirmDelete) }}"</span
        >?
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
import { CHANNELS, IAddress, assert } from "donut-shared";
import { deleteAddressAction } from "donut-shared/src/actions/addresses";
import { Notify } from "quasar";
import { formatAddress } from "src/lib/address";
import { capitalize } from "src/lib/capitalize";
import { useStore } from "src/store";
import { computed, ref } from "vue";
import BigSpinner from "../../components/BigSpinner.vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import NoData from "../../components/NoData.vue";
import { ROWS_PER_TABLE_PAGE, SUCCESS_TIMEOUT_MS } from "../../lib/constants";
import { createFuzzySearcher } from "../../lib/fuzzy-search";
import { useI18nStore } from "../../lib/i18n";

const store = useStore();
const addresses = computed(() => store.state.addresses.addresses);
const fuzzySearch = computed(() =>
  createFuzzySearcher(addresses.value, [
    "city",
    "homeNumber",
    "postalCode",
    "street",
  ])
);
const filtered = computed(() => fuzzySearch.value.search(searchInput.value));
const userId = computed(() => store.state.auth.user.userId);
const channels = computed(() => {
  return [CHANNELS.ADDRESSES_OF_CLIENT(userId.value)];
});
let isSubscribing = useSubscription(channels, { store: store as any });
const t = useI18nStore();
const confirmDelete = ref<null | IAddress>(null);
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
    name: "city",
    label: t.value.city,
    align: "center",
    field: "city",
    format: (val: string) => capitalize(val),
  },
  {
    name: "street",
    label: t.value.street,
    align: "center",
    field: "street",
    format: (val: string) => capitalize(val),
  },
  {
    name: "homeNumber",
    label: t.value.homeNumber,
    align: "center",
    field: "homeNumber",
  },
  {
    name: "postalCode",
    label: t.value.postalCode,
    align: "center",
    field: "postalCode",
  },
  { name: "actions", label: "", align: "right" },
];

const onDeleteAttempt = (row: IAddress) => {
  confirmDelete.value = row;
};

const onDeleteConfirmed = () => {
  assert(confirmDelete.value, "");
  const toDelete = confirmDelete.value.id || "";
  confirmDelete.value = null;
  isDeleting.value = true;
  store.commit
    .sync(
      deleteAddressAction({
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
