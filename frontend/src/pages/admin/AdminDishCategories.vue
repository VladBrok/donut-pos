<template>
  <div>
    <q-spinner-puff
      v-if="isSubscribing"
      color="primary"
      size="4rem"
      class="q-mx-auto d-block"
    />
    <q-table
      v-else
      :rows="store.state.dishCategories.categories"
      :columns="columns"
      row-key="name"
      :rows-per-page-label="t.perPage"
      style="max-width: 600px"
      class="q-mx-auto"
      :loading="isDeleting"
      :pagination="{
        rowsPerPage: ROWS_PER_TABLE_PAGE,
      }"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon="add"
          :label="t.addDishCategory"
          @click="addCategory"
        />
      </template>
      <template v-slot:body-cell-index="props">
        <q-td :props="props">
          {{ props.rowIndex + 1 }}
        </q-td>
      </template>
      <template v-slot:body-cell-image="props">
        <q-td :props="props">
          <q-avatar size="lg" rounded>
            <img :src="props.row.imageUrl" />
          </q-avatar>
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
            @click="onEdit(props.row)"
          >
          </q-btn>
          <q-btn
            flat
            size="md"
            icon="o_delete"
            color="negative"
            dense
            @click="onDeleteAttempt(props.row)"
          >
          </q-btn>
        </q-td>
      </template>
    </q-table>

    <!-- TODO: extract generic confirmation dialog -->
    <q-dialog
      :model-value="!!confirmDelete"
      @update:model-value="confirmDelete = null"
      persistent
    >
      <q-card class="q-pa-xs">
        <q-card-section>
          <div class="text-h6">Confirm delete</div>
        </q-card-section>
        <q-separator inset />

        <q-card-section class="text-body1">
          Are you sure you want to delete category "{{
            capitalize(confirmDelete?.name || "")
          }}"?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            label="Delete"
            color="negative"
            @click="onDeleteConfirmed"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import {
  CHANNELS,
  assert,
  createDishCategoryAction,
  deleteDishCategoryAction,
} from "donut-shared";
import { logInfo } from "donut-shared/src/log";
import { Notify } from "quasar";
import { useStore } from "src/store";
import { computed, ref } from "vue";
import { ROWS_PER_TABLE_PAGE, SUCCESS_TIMEOUT_MS } from "../../lib/constants";
import { useI18nStore } from "../../lib/i18n";
import { capitalize } from "../../lib/utils/capitalize";
import { IDishCategoriesState } from "../../store/dish-categories/state";

const store = useStore();
const channels = computed(() => {
  return [CHANNELS.DISH_CATEGORIES];
});
let isSubscribing = useSubscription(channels, { store: store as any });
const t = useI18nStore();
const confirmDelete = ref<null | IDishCategoriesState["categories"][number]>(
  null
);
const isDeleting = ref(false);

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
    format: capitalize,
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

const onEdit = (row: IDishCategoriesState["categories"][number]) => {
  logInfo("edit:", row);
};

// TODO: remove
const addCategory = () => {
  store.commit.sync(
    createDishCategoryAction({
      imageUrl: "",
      name: "my new category",
    })
  );
};
</script>
