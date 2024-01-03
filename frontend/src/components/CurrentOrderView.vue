<template>
  <q-form @submit="onSubmit" @validation-error="onFormValidationError">
    <OrderView
      :has-content="Boolean(order)"
      :dish-count="order?.dishes.length"
      :total-cost="totalCost"
    >
      <template #content>
        <big-spinner v-if="isSubscribing" />
        <div v-else>
          <div>
            <!-- TODO: add client autotomplete field -->
            <q-select
              :model-value="store.state.currentOrder.order?.table?.number"
              @update:model-value="
                store.commit.crossTab(
                  updateCurrentOrderTableNumberAction({
                    table:
                      diningTables.find((x) => x.number === $event?.trim()) ||
                      null,
                  })
                )
              "
              use-input
              fill-input
              stack-label
              clearable
              hide-selected
              input-debounce="0"
              :disable="
                !!route.query.table &&
                !!store.state.currentOrder.order?.table?.number
              "
              :options="filteredTableNames"
              @filter="filterTables"
              :label="`${t.tableNumberLabel} *`"
              :rules="[(val) => (!!val && val.length > 0) || t.fieldRequired]"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section>
                    {{ t.noResults }}
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-input
              :model-value="store.state.currentOrder.order?.comment"
              @update:model-value="
                store.commit.crossTab(
                  updateCurrentOrderCommentAction({
                    comment: $event?.toString() || '',
                  })
                )
              "
              stack-label
              :label="`${t.commentLabel}`"
              lazy-rules
              type="textarea"
              rows="1"
              autogrow
              :rules="[
                (val) =>
                  !val ||
                  val.length <= COMMENT_MAX_LENGTH ||
                  t.maxLength({ max: COMMENT_MAX_LENGTH }),
              ]"
            />
          </div>

          <div>
            <div v-for="data of dishesInOrder" :key="data.orderDish.uniqueId">
              <dish-in-order
                :dish="data.dish"
                :count="data.count"
                :total-cost="data.totalCost"
                :modifications="data.modifications"
                @delete="
                  store.commit.crossTab(
                    removeDishFromCurrentOrderAction({
                      uniqueId: data.orderDish.uniqueId,
                    })
                  )
                "
                @increment="
                  store.commit.crossTab(
                    addDishToCurrentOrderAction({
                      dish: {
                        id: data.dish.id,
                        modifications: data.orderDish.modifications,
                      },
                    })
                  )
                "
                @decrement="
                  store.commit.crossTab(
                    decrementDishInCurrentOrderAction({
                      dish: {
                        id: data.dish.id,
                        modifications: data.orderDish.modifications,
                      },
                    })
                  )
                "
              />
              <q-separator />
            </div>
          </div>
        </div>
      </template>
      <template #options>
        <div class="row justify-end q-gutter-sm">
          <q-btn
            color="negative"
            flat
            @click="isConfirmClearOpen = true"
            type="button"
          >
            {{ t.clearOrder }}
          </q-btn>
          <q-btn
            color="primary"
            type="submit"
            :loading="isSubmitting"
            :disable="hasDishOutOfStock"
          >
            {{ t.createOrder }}
            <q-tooltip
              v-if="hasDishOutOfStock"
              class="bg-negative text-white text-body1"
              max-width="200px"
            >
              {{ t.cannotCreateOrderWithOutOfStock }}
            </q-tooltip>
          </q-btn>
        </div>
      </template>
    </OrderView>
  </q-form>

  <confirm-dialog v-model="isConfirmClearOpen">
    <template #body> {{ t.confirmCurrentOrderClear }}? </template>
    <template #confirmButton>
      <q-btn flat :label="t.clearOrder" color="negative" @click="clear" />
    </template>
  </confirm-dialog>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import {
  CHANNELS,
  COMMENT_MAX_LENGTH,
  addDishToCurrentOrderAction,
  clearCurrentOrderAction,
  decrementDishInCurrentOrderAction,
  getOrderDishTotalCost,
  removeDishFromCurrentOrderAction,
  updateCurrentOrderCommentAction,
  updateCurrentOrderTableNumberAction,
} from "donut-shared";
import BigSpinner from "src/components/BigSpinner.vue";
import DishInOrder from "src/components/DishInOrder.vue";
import OrderView from "src/components/OrderView.vue";
import { createOrder } from "src/lib/create-order";
import { createFuzzySearcher } from "src/lib/fuzzy-search";
import { onFormValidationError } from "src/lib/on-form-validation-error";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18nStore } from "../lib/i18n";
import { useStore } from "../store";
import ConfirmDialog from "./ConfirmDialog.vue";

const store = useStore();
const order = computed(() => store.state.currentOrder.order);
const t = useI18nStore();
const isConfirmClearOpen = ref(false);
const isSubmitting = ref(false);
const channels = computed(() => [
  CHANNELS.DISHES,
  CHANNELS.MODIFICATIONS,
  CHANNELS.DINING_TABLES,
]);
const tableNumberSearchInput = ref("");
const tableNumberFuzzySearch = computed(() =>
  createFuzzySearcher(store.state.diningTables.tables, ["number"])
);
const filteredTableNames = computed(() =>
  tableNumberFuzzySearch.value
    .search(tableNumberSearchInput.value)
    .map((x) => x.number)
);
const isSubscribing = useSubscription(channels, { store: store as any });
const diningTables = computed(() => store.state.diningTables.tables);
const dishes = computed(() => store.state.dishes.dishes);
const modifications = computed(() => store.state.modifications.modifications);
const dishesInOrder = computed(() =>
  isSubscribing.value
    ? []
    : // TODO: what if the dish or modification will be deleted during processing? We might have nulls in this case below...
      order.value?.dishes.map((dish) => {
        const foundDish = dishes.value.find((x) => x.id === dish.dishId)!;
        const foundModifications = dish.modifications.map((x) => ({
          modification: modifications.value.find((y) => y.id === x.id)!,
          count: x.count,
        }));
        return {
          orderDish: dish,
          dish: foundDish,
          count: dish.count,
          modifications: foundModifications,
          totalCost: getOrderDishTotalCost({
            count: dish.count,
            price: foundDish.price,
            modifications: foundModifications.map((x) => ({
              count: x.count,
              price: x.modification.price,
            })),
          }),
        };
      })
);
const hasDishOutOfStock = computed(
  () => dishesInOrder.value?.some((x) => !x.dish.isActive) || false
);
const totalCost = computed(
  () => dishesInOrder.value?.reduce((sum, cur) => sum + cur.totalCost, 0) || 0
);
const route = useRoute();

const unsubscribe = watch(
  isSubscribing,
  () => {
    if (isSubscribing.value) {
      return;
    }

    if (route.query.table) {
      store.commit.crossTab(
        updateCurrentOrderTableNumberAction({
          table:
            diningTables.value.find(
              (x) => x.number === route.query.table?.toString()?.trim()
            ) || null,
        })
      );
    }

    unsubscribe();
  },
  { immediate: true }
);

const filterTables = (val: string, update: any) => {
  update(() => {
    tableNumberSearchInput.value = val;
  });
};

function clear() {
  store.commit.crossTab(clearCurrentOrderAction());
  isConfirmClearOpen.value = false;
}

async function onSubmit() {
  isSubmitting.value = true;
  createOrder(store, order.value!, t).finally(() => {
    isSubmitting.value = false;
  });
}
</script>
