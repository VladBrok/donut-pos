<template>
  <div>
    <big-spinner v-if="isSubscribing" />

    <q-table
      v-else
      class="q-mx-auto max-w-xl"
      :rows="clientsPage"
      :columns="columns"
      row-key="id"
      :rows-per-page-label="t.perPage"
      :loading="isUpdatingPage"
      :rows-per-page-options="[]"
      :filter="searchInput"
      v-model:pagination="pagination"
      @request="updatePage"
    >
      <template v-slot:top-right>
        <q-input
          dense
          v-model="searchInput"
          :placeholder="t.search"
          debounce="500"
          class="q-mr-lg q-my-sm"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-index="props">
        <q-td :props="props">
          {{ props.rowIndex + 1 }}
        </q-td>
      </template>
      <template v-slot:body-cell-isEmailVerified="props">
        <q-td :props="props">
          <q-radio
            class="disabled-cursor-default"
            :model-value="'true'"
            checked-icon="task_alt"
            unchecked-icon="close"
            :val="props.row.isEmailVerified.toString()"
            label=""
            disable
            :color="props.row.isEmailVerified ? 'positive' : 'negative'"
            keep-color
          />
        </q-td>
      </template>
      <template v-slot:body-cell-isPhoneVerified="props">
        <q-td :props="props">
          <q-radio
            class="disabled-cursor-default"
            :model-value="'true'"
            checked-icon="task_alt"
            unchecked-icon="close"
            :val="props.row.isPhoneVerified.toString()"
            label=""
            disable
            :color="props.row.isPhoneVerified ? 'positive' : 'negative'"
            keep-color
          />
        </q-td>
      </template>
      <template v-slot:body-cell-isAnonymous="props">
        <q-td :props="props">
          <q-radio
            class="disabled-cursor-default"
            :model-value="'true'"
            checked-icon="task_alt"
            unchecked-icon="close"
            :val="props.row.isAnonymous?.toString()"
            label=""
            disable
            :color="props.row.isAnonymous ? 'positive' : 'negative'"
            keep-color
          />
        </q-td>
      </template>
      <template v-slot:no-data>
        <no-data></no-data>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { CHANNELS, loadClientsPageAction } from "donut-shared";
import { ROWS_PER_TABLE_PAGE } from "src/lib/constants";
import { formatDateTime } from "src/lib/date";
import { formatPhoneNumber } from "src/lib/phone";
import { useStore } from "src/store";
import { computed, ref, watch } from "vue";
import BigSpinner from "../../../components/BigSpinner.vue";
import NoData from "../../../components/NoData.vue";
import { useI18nStore } from "../../../lib/i18n";

const store = useStore();
const clientsPage = computed(() => store.state.clients.clientsPage);
const channels = computed(() => {
  return [CHANNELS.CLIENTS];
});
let isSubscribing = useSubscription(channels, { store: store as any });
const t = useI18nStore();
const searchInput = ref("");
const pagination = ref({
  page: 1,
  rowsPerPage: ROWS_PER_TABLE_PAGE,
  rowsNumber: ROWS_PER_TABLE_PAGE,
});
const isUpdatingPage = ref(false);

const columns: any[] = [
  {
    name: "index",
    label: "#",
    field: "index",
    align: "center",
  },
  {
    name: "firstName",
    label: t.value.firstName,
    align: "center",
    field: "firstName",
  },
  {
    name: "lastName",
    label: t.value.lastName,
    align: "center",
    field: "lastName",
  },
  {
    name: "registeredAt",
    label: t.value.registeredAt,
    align: "center",
    field: "registeredAt",
    format: (val: string) => formatDateTime(val),
  },
  {
    name: "email",
    label: t.value.email,
    align: "center",
    field: "email",
  },
  {
    name: "isEmailVerified",
    label: t.value.isEmailVerified,
    align: "center",
    field: "isEmailVerified",
  },
  {
    name: "phone",
    label: t.value.phone,
    align: "center",
    field: "phone",
    format: (val: string) => (val ? formatPhoneNumber(val) : "-"),
  },
  {
    name: "isPhoneVerified",
    label: t.value.isPhoneVerified,
    align: "center",
    field: "isPhoneVerified",
  },
  {
    name: "isAnonymous",
    label: t.value.isAnonymous,
    align: "center",
    field: "isAnonymous",
  },
];

const stopWatchingSubscribing = watch(isSubscribing, () => {
  if (!isSubscribing.value) {
    pagination.value.rowsNumber = store.state.clients.totalClients;
    stopWatchingSubscribing();
  }
});

const updatePage = ({ pagination: { page } }: any) => {
  isUpdatingPage.value = true;
  store.commit
    .sync(
      loadClientsPageAction({
        page: page,
        search: searchInput.value?.trim() || undefined,
      })
    )
    .then(() => {
      pagination.value.page = page;
      pagination.value.rowsNumber = store.state.clients.totalClients;
    })
    .finally(() => {
      isUpdatingPage.value = false;
    });
};
</script>
