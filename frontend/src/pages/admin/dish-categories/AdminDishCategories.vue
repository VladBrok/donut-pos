<template>
  <div>
    <big-spinner v-if="isSubscribing" />
    <q-table
      v-else
      class="q-mx-auto max-w-lg sticky-last-column-table"
      :rows="categoriesFiltered"
      :columns="columns"
      row-key="id"
      :rows-per-page-label="t.perPage"
      :loading="isDeleting"
      binary-state-sort
      :pagination="{
        rowsPerPage: ROWS_PER_TABLE_PAGE,
      }"
    >
      <!-- @row-click="
        (_, row) => $router.push(`/admin/dish-categories/update/${row.id}`)
      " -->
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
          :label="t.addDishCategory"
          to="/admin/dish-categories/create"
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
            :to="`/admin/dish-categories/update/${props.row.id}`"
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
        {{ t.confirmDishCategoryDelete }}
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
import { deleteDishCategoryAction } from "donut-shared/src/actions/dish-categories";
import { CHANNELS } from "donut-shared/src/constants";
import { Notify } from "quasar";
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
import { IDishCategoriesState } from "../../../store/dish-categories/state";

const store = useStore();
const categories = computed(() => store.state.dishCategories.categories);
const fuzzySearch = computed(() =>
  createFuzzySearcher(categories.value, ["name"])
);
const categoriesFiltered = computed(() =>
  fuzzySearch.value.search(searchInput.value)
);
const channels = computed(() => {
  return [CHANNELS.DISH_CATEGORIES];
});
let isSubscribing = useSubscription(channels, { store: store as any });
const t = useI18nStore();
const confirmDelete = ref<null | IDishCategoriesState["categories"][number]>(
  null
);
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
  { name: "actions", label: "", align: "right" },
];

const onDeleteAttempt = (row: IDishCategoriesState["categories"][number]) => {
  confirmDelete.value = row;
};

const onDeleteConfirmed = () => {
  assert(confirmDelete.value, "");
  const toDelete = confirmDelete.value.id;
  confirmDelete.value = null;
  isDeleting.value = true;
  store.commit
    .sync(
      deleteDishCategoryAction({
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
