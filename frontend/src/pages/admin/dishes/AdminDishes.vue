<template>
  <div>
    <big-spinner v-if="isSubscribing" />
    <q-table
      v-else
      class="q-mx-auto max-w-xl sticky-last-column-table"
      :rows="dishesFiltered"
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
          :label="t.addDish"
          to="/admin/dishes/create"
        />
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
          <q-btn
            flat
            size="md"
            icon="mode_edit"
            color="primary"
            dense
            class="q-mr-sm"
            @click.stop
            :to="`/admin/dishes/update/${props.row.id}`"
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
        {{ t.confirmDishDelete }}
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
import { assert } from "donut-shared";
import { deleteDishAction } from "donut-shared/src/actions/dishes";
import { CHANNELS } from "donut-shared/src/constants";
import { Notify } from "quasar";
import { fractionalToWhole } from "src/lib/currency";
import { useStore } from "src/store";
import { computed, ref } from "vue";
import BigSpinner from "../../../components/BigSpinner.vue";
import ConfirmDialog from "../../../components/ConfirmDialog.vue";
import NoData from "../../../components/NoData.vue";
import {
  NO_DATA,
  ROWS_PER_TABLE_PAGE,
  SUCCESS_TIMEOUT_MS,
} from "../../../lib/constants";
import { createFuzzySearcher } from "../../../lib/fuzzy-search";
import { useI18nStore } from "../../../lib/i18n";
import { IDishesState } from "../../../store/dishes/state";

const store = useStore();
const dishes = computed(() => store.state.dishes.dishes);
const fuzzySearch = computed(() =>
  createFuzzySearcher(dishes.value, [
    "name",
    "category.name",
    "price",
    "weight",
  ])
);
const dishesFiltered = computed(() =>
  fuzzySearch.value.search(searchInput.value)
);
const channels = computed(() => {
  return [CHANNELS.DISHES];
});
let isSubscribing = useSubscription(channels, { store: store as any });
const t = useI18nStore();
const confirmDelete = ref<null | IDishesState["dishes"][number]>(null);
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
    name: "image",
    label: t.value.image,
    align: "center",
    field: "imageUrl",
  },
  {
    name: "name",
    label: t.value.name,
    align: "center",
    field: "name",
    sortable: true,
  },
  {
    name: "category",
    label: t.value.category,
    align: "center",
    sortable: true,
    field: (row: IDishesState["dishes"][number]) => {
      return row.category?.name || NO_DATA;
    },
  },
  {
    name: "price",
    label: t.value.price,
    align: "center",
    field: "price",
    sortable: true,
    format: (x: number) => fractionalToWhole(x).toFixed(2),
  },
  {
    name: "weight",
    label: t.value.weight,
    align: "center",
    field: "weight",
    sortable: true,
  },
  {
    name: "active",
    label: t.value.active,
    align: "center",
    field: "isActive",
    sortable: true,
  },
  { name: "actions", label: "", align: "right" },
];

const onDeleteAttempt = (row: IDishesState["dishes"][number]) => {
  confirmDelete.value = row;
};

const onDeleteConfirmed = () => {
  assert(confirmDelete.value, "");
  const toDelete = confirmDelete.value.id;
  confirmDelete.value = null;
  isDeleting.value = true;
  store.commit
    .sync(
      deleteDishAction({
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
