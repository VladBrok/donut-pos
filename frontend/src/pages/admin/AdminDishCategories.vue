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
      style="max-width: 500px"
      class="q-mx-auto"
    >
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
            color="secondary"
            dense
            class="q-mr-sm"
            @click="onEdit(props.row.id)"
          ></q-btn>
          <q-btn
            flat
            size="md"
            icon="o_delete"
            color="negative"
            dense
            @click="onDelete(props.row.id)"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { CHANNELS } from "donut-shared";
import { logInfo } from "donut-shared/src/log";
import { useStore } from "src/store";
import { computed } from "vue";
import { useI18nStore } from "../../lib/i18n";

const store = useStore();
const channels = computed(() => {
  return [CHANNELS.DISH_CATEGORIES];
});
let isSubscribing = useSubscription(channels, { store: store as any });
const t = useI18nStore();

const columns: any[] = [
  {
    name: "index",
    label: "#",
    field: "index",
    align: "center",
    classes: "text-body1",
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
    format: (val: string) => val[0].toUpperCase() + val.slice(1),
  },
  { name: "actions", label: "", align: "right" },
];

const onDelete = (rowId: string) => {
  logInfo("delete:", rowId);
};

const onEdit = (rowId: string) => {
  logInfo("edit:", rowId);
};
</script>
