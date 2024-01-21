<template>
  <OrderView
    :key="order.id"
    has-content
    card-padding
    apply-shadow
    :order-type="order.type"
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
          :model-value="order.table?.number || '-'"
          readonly
          stack-label
          :label="`${t.tableNumberLabel}`"
          lazy-rules
          type="text"
          class="q-mb-md"
        />
        <q-input
          v-if="order.type === 'dine-in'"
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
                @status-updated="handleDishStatusUpdated"
              />
            </template>
          </dish-in-order>
          <q-separator />
        </div>
      </TransitionGroup>

      <q-inner-loading :showing="isUpdatingOrder">
        <BigSpinner />
      </q-inner-loading>
    </template>
  </OrderView>
</template>

<script setup lang="ts">
import {
  IOrder,
  markOrderAsCookedAction,
} from "donut-shared/src/actions/orders";
import BigSpinner from "src/components/BigSpinner.vue";
import DishDetailsModal from "src/components/DishDetailsModal.vue";
import DishInOrder from "src/components/DishInOrder.vue";
import DishInOrderStatusButton from "src/components/DishInOrderStatusButton.vue";
import OrderNumberTitle from "src/components/OrderNumberTitle.vue";
import OrderView from "src/components/OrderView.vue";
import { getOrderTypeIcon } from "src/lib/get-order-type-icon";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "src/store";
import { ref } from "vue";

const props = defineProps<{
  order: IOrder;
}>();

const t = useI18nStore();
const isUpdatingOrder = ref(false);
const store = useStore();

function handleDishStatusUpdated() {
  const dishes = props.order.dishes;
  const allCooked = dishes.every((dish) => dish.cookedDate);
  if (allCooked) {
    isUpdatingOrder.value = true;
    store.commit
      .sync(
        markOrderAsCookedAction({
          orderId: props.order.id,
        })
      )
      .finally(() => {
        isUpdatingOrder.value = false;
      });
  }
}
</script>
