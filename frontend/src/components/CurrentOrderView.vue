<template>
  <div class="full-height">
    <q-card v-if="order" class="full-height shadow-0">
      <q-form @submit="onSubmit" @validation-error="onFormValidationError">
        <div class="scroll current-order-height">
          <big-spinner v-if="isSubscribing" />
          <div v-else>
            <div>
              <!-- TODO: add client autotomplete field -->
              <q-input
                :model-value="store.state.currentOrder.order?.tableNumber"
                @update:model-value="
                  store.commit.crossTab(
                    updateCurrentOrderTableNumberAction({
                      tableNumber: $event?.toString()?.trim() || '',
                    })
                  )
                "
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
                rows="3"
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
        </div>

        <template v-if="order.dishes.length">
          <div>
            <q-separator />
            <div class="row justify-between gap-sm q-pt-md q-mb-sm">
              <div class="text-h5">
                {{ t.totalDishes(order.dishes.length) }}
              </div>
              <div class="text-weight-medium text-h5">
                {{ formatCurrency(totalCost) }}
              </div>
            </div>
          </div>
          <div class="row justify-end q-gutter-sm">
            <q-btn
              color="negative"
              flat
              @click="isConfirmClearOpen = true"
              type="button"
            >
              {{ t.clearOrder }}
            </q-btn>
            <q-btn color="primary" type="submit" :loading="isSubmitting">
              {{ t.createOrder }}
            </q-btn>
          </div>
        </template>
      </q-form>
    </q-card>
    <no-data v-else class="q-mt-xl" :text="t.emptyOrder"> </no-data>
  </div>

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
  COMMENT_MAX_LENGTH,
  TABLE_NUMBER_MAX_LENGTH,
  addDishToCurrentOrderAction,
  clearCurrentOrderAction,
  createOrderAction,
  decrementDishInCurrentOrderAction,
  removeDishFromCurrentOrderAction,
  updateCurrentOrderCommentAction,
  updateCurrentOrderTableNumberAction,
} from "donut-shared";
import { Notify } from "quasar";
import BigSpinner from "src/components/BigSpinner.vue";
import DishInOrder from "src/components/DishInOrder.vue";
import { SUCCESS_TIMEOUT_MS } from "src/lib/constants";
import { formatCurrency } from "src/lib/currency";
import { onFormValidationError } from "src/lib/on-form-validation-error";
import { getOrderDishTotalCost } from "src/lib/order";
import { computed, ref } from "vue";
import { CHANNELS } from "../../../shared/src/constants";
import { useI18nStore } from "../lib/i18n";
import { useStore } from "../store";
import ConfirmDialog from "./ConfirmDialog.vue";
import NoData from "./NoData.vue";

const store = useStore();
const order = computed(() => store.state.currentOrder.order);
const t = useI18nStore();
const isConfirmClearOpen = ref(false);
const isSubmitting = ref(false);
const channels = computed(() => [CHANNELS.DISHES, CHANNELS.MODIFICATIONS]);
const isSubscribing = useSubscription(channels, { store: store as any });
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
const totalCost = computed(
  () => dishesInOrder.value?.reduce((sum, cur) => sum + cur.totalCost, 0) || 0
);

function clear() {
  store.commit.crossTab(clearCurrentOrderAction());
  isConfirmClearOpen.value = false;
}

async function onSubmit() {
  isSubmitting.value = true;
  store.commit
    .sync(
      createOrderAction({
        order: order.value,
      })
    )
    .then(() => {
      Notify.create({
        type: "positive",
        position: "top",
        timeout: SUCCESS_TIMEOUT_MS,
        message: t.value.createSuccess,
        multiLine: true,
        group: false,
      });

      store.commit.crossTab(clearCurrentOrderAction());
    })
    .finally(() => {
      isSubmitting.value = false;
    });
}
</script>
