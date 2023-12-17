<template>
  <div class="full-height">
    <q-card v-if="order" class="full-height shadow-0">
      <div>
        <div class="scroll current-order-height">
          <div>
            <div>
              <!-- TODO: add client field -->
              <q-input
                :model-value="order.tableNumber || '-'"
                readonly
                stack-label
                :label="`${t.tableNumberLabel}`"
                lazy-rules
                type="text"
                class="q-mb-md"
              />
              <q-input
                :model-value="order.comment || '-'"
                stack-label
                :label="`${t.commentLabel}`"
                lazy-rules
                type="textarea"
                readonly
                rows="3"
              />
            </div>

            <div>
              <div v-for="(dish, i) of order.dishes" :key="i">
                <dish-in-order
                  :dish="dish"
                  :count="dish.count"
                  :total-cost="getOrderDishTotalCost(dish)"
                  :modifications="
                    dish.modifications.map((x) => ({
                      count: x.count,
                      modification: x,
                    }))
                  "
                  view-only
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
        </template>
      </div>
    </q-card>
    <no-data v-else class="q-mt-xl" :text="t.emptyOrder"> </no-data>
  </div>
</template>

<script setup lang="ts">
import DishInOrder from "src/components/DishInOrder.vue";
import { formatCurrency } from "src/lib/currency";
import { getOrderDishTotalCost, getOrderTotalCost } from "src/lib/order";
import { computed } from "vue";
import { ordersPageLoadedAction } from "../../../shared/src/actions/orders";
import { useI18nStore } from "../lib/i18n";
import { useStore } from "../store";
import NoData from "./NoData.vue";

const props = defineProps<{
  order: ReturnType<
    typeof ordersPageLoadedAction
  >["payload"]["ordersPage"][number];
}>();

const store = useStore();
const order = computed(() => props.order);
const totalCost = computed(() => getOrderTotalCost(order.value.dishes));
const t = useI18nStore();
</script>
