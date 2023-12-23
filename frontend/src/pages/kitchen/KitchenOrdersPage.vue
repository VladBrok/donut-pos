<template>
  <div>
    <big-spinner v-if="isSubscribing" />
    <div v-else>
      <div class="card-grid-lg">
        <OrderView
          v-for="order in orders"
          :key="order.id"
          has-content
          card-padding
          apply-shadow
        >
          <template #content>
            <div>
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
                :model-value="
                  order.employee?.lastName + ' ' + order.employee?.firstName
                "
                readonly
                stack-label
                :label="`${t.waiterName}`"
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
                rows="1"
                autogrow
                class="q-mb-md"
              />
            </div>

            <TransitionGroup tag="div" name="fade">
              <div v-for="dish of order.dishes" :key="getUniqueDishId(dish)">
                <dish-in-order
                  :dish="dish"
                  :count="dish.count"
                  :is-cooking="dish.isCooking"
                  :is-ready="dish.isReady"
                  :order-number="order.orderNumber"
                  :order-id="order.id"
                  :dish-id-in-order="dish.dishIdInOrder"
                  :modifications="
                    dish.modifications.map((x) => ({
                      count: x.count,
                      modification: x,
                    }))
                  "
                  view-only
                  for-kitchen
                />
                <q-separator />
              </div>
            </TransitionGroup>
          </template>
        </OrderView>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { CHANNELS } from "donut-shared/src/constants";
import BigSpinner from "src/components/BigSpinner.vue";
import DishInOrder from "src/components/DishInOrder.vue";
import OrderView from "src/components/OrderView.vue";
import { getUniqueDishId } from "src/lib/get-unique-dish-id";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "src/store";
import { computed } from "vue";

const store = useStore();
const channels = computed(() => [CHANNELS.ORDERS_FOR_KITCHEN]);
const isSubscribing = useSubscription(channels, { store: store as any });
const orders = computed(() => store.state.orders.ordersForKitchen);
const t = useI18nStore();
</script>
