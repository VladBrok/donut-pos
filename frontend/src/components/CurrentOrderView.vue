<template>
  <div class="full-height">
    <q-card v-if="order" class="full-height shadow-0">
      <q-form @submit="onSubmit">
        <div class="restricted-height-50vh scroll">
          <big-spinner v-if="isSubscribing" />
          <div v-else>
            <!-- TODO: what if the dish or modification will be deleted during processing? -->
            <div v-for="dish of order.dishes" :key="dish.uniqueId">
              <q-separator />
              <dish-in-order
                :dish="dishes.find((x) => x.id === dish.dishId)!"
                :count="dish.count"
                :modifications="dish.modifications.map(x => ({ modification: modifications.find(y => y.id === x.id)!, count: x.count}))"
                @delete="
                  store.commit.crossTab(
                    removeDishFromCurrentOrderAction({
                      uniqueId: dish.uniqueId,
                    })
                  )
                "
                @increment="
                  store.commit.crossTab(
                    addDishToCurrentOrderAction({
                      dish: {
                        id: dish.dishId,
                        modifications: dish.modifications,
                      },
                    })
                  )
                "
              >
              </dish-in-order>
            </div>
            <q-separator />
          </div>
        </div>
        <div class="q-mt-lg">
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
            :label="`${t.tableNumberLabel}`"
            lazy-rules
            type="text"
            :rules="[
              (val) =>
                !val ||
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
            rows="4"
            :rules="[
              (val) =>
                !val ||
                val.length <= COMMENT_MAX_LENGTH ||
                t.maxLength({ max: COMMENT_MAX_LENGTH }),
            ]"
          />
        </div>
        <div class="row justify-end q-gutter-sm q-mt-md">
          <q-btn
            color="dark"
            flat
            @click="isConfirmClearOpen = true"
            type="button"
          >
            {{ t.clearOrder }}
          </q-btn>
          <q-btn color="primary" type="submit">
            {{ t.createOrder }}
          </q-btn>
        </div>
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
  addDishToCurrentOrderAction,
  clearCurrentOrderAction,
  COMMENT_MAX_LENGTH,
  removeDishFromCurrentOrderAction,
  TABLE_NUMBER_MAX_LENGTH,
  updateCurrentOrderCommentAction,
  updateCurrentOrderTableNumberAction,
} from "donut-shared";
import BigSpinner from "src/components/BigSpinner.vue";
import DishInOrder from "src/components/DishInOrder.vue";
import { computed, ref } from "vue";
import { CHANNELS } from "../../../shared/src/constants";
import { logInfo } from "../../../shared/src/lib/log";
import { useI18nStore } from "../lib/i18n";
import { useStore } from "../store";
import ConfirmDialog from "./ConfirmDialog.vue";
import NoData from "./NoData.vue";

const store = useStore();
const order = computed(() => store.state.currentOrder.order);
const t = useI18nStore();
const isConfirmClearOpen = ref(false);
const channels = computed(() => [CHANNELS.DISHES, CHANNELS.MODIFICATIONS]);
const isSubscribing = useSubscription(channels, { store: store as any });
const dishes = computed(() => store.state.dishes.dishes);
const modifications = computed(() => store.state.modifications.modifications);

function clear() {
  store.commit.crossTab(clearCurrentOrderAction());
  isConfirmClearOpen.value = false;
}

function onSubmit() {
  // TODO: dispatch an action to create an order
  logInfo("create order");
}
</script>
