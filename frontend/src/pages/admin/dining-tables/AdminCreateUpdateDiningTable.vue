<template>
  <div class="max-w-sm q-mx-auto">
    <back-button />
    <big-spinner v-if="isSubscribing" />
    <q-form v-else @submit="onSubmit" @validation-error="onFormValidationError">
      <q-card class="q-pa-md">
        <q-card-section class="q-gutter-lg">
          <q-input
            v-model.trim="tableNumber"
            stack-label
            :label="`${t.tableNumberLabel} *`"
            lazy-rules
            type="text"
            :rules="[
              (val) => (!!val && val.length > 0) || t.fieldRequired,
              (val) =>
                val.length <= TABLE_NUMBER_MAX_LENGTH ||
                t.maxLength({ max: TABLE_NUMBER_MAX_LENGTH }),
            ]"
          />
          <q-select
            v-model="waiter"
            use-input
            fill-input
            stack-label
            clearable
            hide-selected
            input-debounce="0"
            :options="filteredWaiters"
            @filter="filterWaiters"
            :label="`${t.waiter} *`"
            :rules="[(val) => !!val || t.fieldRequired]"
          >
            <template v-slot:selected>
              <q-item v-if="waiter">
                <q-item-section>
                  <q-item-label
                    >{{ waiter?.lastName }}
                    {{ waiter?.firstName }}</q-item-label
                  >
                  <q-item-label caption>{{ waiter?.email }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label
                    >{{ scope.opt.lastName }}
                    {{ scope.opt.firstName }}</q-item-label
                  >
                  <q-item-label caption>{{ scope.opt.email }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:no-option>
              <q-item>
                <q-item-section>
                  {{ t.noResults }}
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-card-section>
      </q-card>
      <div class="row justify-end q-gutter-sm q-mt-md">
        <q-btn
          :label="t.cancel"
          @click="() => router.back()"
          color="dark"
          flat
        />
        <q-btn
          :label="t.save"
          :loading="isSubmitting"
          type="submit"
          color="primary"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import {
  CHANNELS,
  TABLE_NUMBER_MAX_LENGTH,
  createDiningTableAction,
  updateDiningTableAction,
} from "donut-shared";
import { IDiningTable } from "donut-shared/src/actions/current-order";
import { Notify } from "quasar";
import { createFuzzySearcher } from "src/lib/fuzzy-search";
import { onFormValidationError } from "src/lib/on-form-validation-error";
import { useStore } from "src/store";
import { computed, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import BackButton from "../../../components/BackButton.vue";
import BigSpinner from "../../../components/BigSpinner.vue";
import { SUCCESS_TIMEOUT_MS } from "../../../lib/constants";
import { useI18nStore } from "../../../lib/i18n";

const t = useI18nStore();
const store = useStore();
const router = useRouter();
const isSubmitting = ref(false);
const tableNumber = ref("");

const id = computed(() => router.currentRoute.value.params.id);
const originalTable = computed(() => {
  return id.value
    ? store.state.diningTables.tables.find((x) => x.id === id.value)
    : undefined;
});
const channels = computed(() => [CHANNELS.EMPLOYEES, CHANNELS.DINING_TABLES]);
const waiterSearchInput = ref("");
// TODO: add also email and some other data
const waiter = ref<IDiningTable["employee"] & { label: string }>();
const waiterFuzzySearch = computed(() =>
  createFuzzySearcher(store.state.employees.employees, [
    "firstName",
    "lastName",
    "email",
  ])
);
const filteredWaiters = computed(() =>
  waiterFuzzySearch.value
    .search(waiterSearchInput.value)
    .map((x) => ({ ...x, label: x.lastName + " " + x.firstName }))
);
let isSubscribing = useSubscription(channels, { store: store as any });

const unsubscribe = watchEffect(
  () => {
    if (originalTable.value) {
      tableNumber.value = originalTable.value.number;
      waiter.value = {
        ...originalTable.value.employee,
        label:
          originalTable.value.employee.lastName +
          " " +
          originalTable.value.employee.firstName,
      };
      unsubscribe();
    } else if (id.value && store.state.diningTables.tables.length) {
      router.push("/404");
    }
  },
  { flush: "post" }
);

const filterWaiters = (val: string, update: any) => {
  update(() => {
    waiterSearchInput.value = val;
  });
};

const onSubmit = async () => {
  isSubmitting.value = true;
  store.commit
    .sync(
      originalTable.value
        ? updateDiningTableAction({
            table: {
              id: originalTable.value.id,
              number: tableNumber.value,
              employee: {
                id: waiter.value?.id,
                firstName: waiter.value?.firstName,
                lastName: waiter.value?.lastName,
              },
            },
          })
        : createDiningTableAction({
            table: {
              number: tableNumber.value,
              employee: {
                id: waiter.value?.id,
                firstName: waiter.value?.firstName,
                lastName: waiter.value?.lastName,
              },
            },
          })
    )
    .then(() => {
      Notify.create({
        type: "positive",
        position: "top",
        timeout: SUCCESS_TIMEOUT_MS,
        message: originalTable.value
          ? t.value.updateSuccess
          : t.value.createSuccess,
        multiLine: true,
        group: false,
      });
      router.push("/admin/dining-tables");
    })
    .finally(() => {
      isSubmitting.value = false;
    });
};
</script>
