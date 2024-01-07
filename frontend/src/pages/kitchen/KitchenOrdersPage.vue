<template>
  <div>
    <big-spinner v-if="isSubscribing" />
    <div v-else>
      <TransitionGroup
        v-if="orders.length"
        tag="div"
        name="fade"
        class="card-grid-lg"
      >
        <OrderView
          v-for="order in orders"
          :key="order.id"
          has-content
          card-padding
          apply-shadow
        >
          <template #content>
            <order-number-title
              :order-number="order.orderNumber"
              class="text-h6 q-mb-sm"
              copy-button-size="sm"
            >
            </order-number-title>
            <div>
              <q-input
                stack-label
                readonly
                :model-value="t[`orderType_${order.type}`]?.toString()"
                type="text"
                :label="t.orderTypeLabel"
                class="q-mb-md"
              >
                <template v-slot:before>
                  <q-icon :name="getOrderTypeIcon(order.type)" />
                </template>
              </q-input>
              <q-input
                v-if="order.type === 'dine-in'"
                :model-value="order.table.number || '-'"
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
              <div v-for="dish of order.dishes" :key="dish.dishIdInOrder">
                <dish-in-order
                  :dish="dish"
                  :count="dish.count"
                  :dish-in-order="dish"
                  :modifications="
                    dish.modifications.map((x) => ({
                      count: x.count,
                      modification: x,
                    }))
                  "
                  view-only
                  for-kitchen
                  hide-price
                >
                  <template #modal="{ modalOpen, updateModelOpen }">
                    <dish-details-modal
                      :dish="dish"
                      :model-value="modalOpen"
                      @update:model-value="updateModelOpen($event)"
                      :count="dish.count"
                      view-only
                    >
                    </dish-details-modal>
                  </template>
                  <template #actions>
                    <dish-in-order-status-button
                      :order="order"
                      :dish-in-order="dish"
                    />
                  </template>
                </dish-in-order>
                <q-separator />
              </div>
            </TransitionGroup>
          </template>
        </OrderView>
      </TransitionGroup>
      <NoData v-else> </NoData>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { CHANNELS } from "donut-shared";
import BigSpinner from "src/components/BigSpinner.vue";
import DishDetailsModal from "src/components/DishDetailsModal.vue";
import DishInOrder from "src/components/DishInOrder.vue";
import DishInOrderStatusButton from "src/components/DishInOrderStatusButton.vue";
import NoData from "src/components/NoData.vue";
import OrderNumberTitle from "src/components/OrderNumberTitle.vue";
import OrderView from "src/components/OrderView.vue";
import { getOrderTypeIcon } from "src/lib/get-order-type-icon";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "src/store";
import { computed } from "vue";

const store = useStore();
const channels = computed(() => [CHANNELS.ORDERS_FOR_KITCHEN]);
const isSubscribing = useSubscription(channels, { store: store as any });
const orders = computed(() => store.state.orders.ordersForKitchen);
const t = useI18nStore();
</script>
