<template>
  <div>
    <big-spinner v-if="isSubscribing" />
    <q-table
      v-else
      class="q-mx-auto max-w-xl sticky-last-column-table"
      :rows="employeesFiltered"
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
          :label="t.addEmployee"
          to="/admin/employees/create"
        />
      </template>
      <template v-slot:body-cell-index="props">
        <q-td :props="props">
          {{ props.rowIndex + 1 }}
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
            :to="`/admin/employees/update/${props.row.id}`"
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
        {{ t.confirmEmployeeDelete }}
        <span class="text-weight-bold"
          >{{ confirmDelete?.lastName }} {{ confirmDelete?.firstName }}</span
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
import { assert } from "donut-shared";
import { deleteEmployeeAction } from "donut-shared/src/actions/employees";
import { CHANNELS } from "donut-shared/src/constants";
import { Notify } from "quasar";
import { formatPhoneNumber } from "src/lib/phone";
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
import { formatDateTime } from "../../../lib/date";
import { createFuzzySearcher } from "../../../lib/fuzzy-search";
import { useI18nStore } from "../../../lib/i18n";
import { IEmployeesState } from "../../../store/employees/state";

const store = useStore();
const employees = computed(() => store.state.employees.employees);
const fuzzySearch = computed(() =>
  createFuzzySearcher(employees.value, [
    "firstName",
    "lastName",
    "phone",
    "registeredAt",
    "role.codeName",
  ])
);
const employeesFiltered = computed(() =>
  fuzzySearch.value.search(searchInput.value)
);
const channels = computed(() => {
  return [CHANNELS.EMPLOYEES];
});
let isSubscribing = useSubscription(channels, { store: store as any });
const t = useI18nStore();
const confirmDelete = ref<null | IEmployeesState["employees"][number]>(null);
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
    name: "firstName",
    label: t.value.firstName,
    align: "center",
    field: "firstName",
    sortable: true,
  },
  {
    name: "lastName",
    label: t.value.lastName,
    align: "center",
    field: "lastName",
    sortable: true,
  },
  {
    name: "role",
    label: t.value.role,
    align: "center",
    sortable: true,
    field: (row: IEmployeesState["employees"][number]) => {
      return row.role?.codeName || NO_DATA;
    },
  },
  {
    name: "registeredAt",
    label: t.value.registeredAt,
    align: "center",
    field: "registeredAt",
    sortable: true,
    format: (val: string) => formatDateTime(val),
  },
  {
    name: "phone",
    label: t.value.phone,
    align: "center",
    field: "phone",
    sortable: true,
    format: formatPhoneNumber,
  },
  {
    name: "isPhoneVerified",
    label: t.value.isPhoneVerified,
    align: "center",
    field: "isPhoneVerified",
    sortable: true,
  },
  { name: "actions", label: "", align: "right" },
];

const onDeleteAttempt = (row: IEmployeesState["employees"][number]) => {
  confirmDelete.value = row;
};

const onDeleteConfirmed = () => {
  assert(confirmDelete.value, "");
  const toDelete = confirmDelete.value.id;
  confirmDelete.value = null;
  isDeleting.value = true;
  store.commit
    .sync(
      deleteEmployeeAction({
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
