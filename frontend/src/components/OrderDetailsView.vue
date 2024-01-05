<template>
  <OrderView
    :has-content="Boolean(order)"
    :dish-count="order?.dishes.length"
    :total-cost="totalCost"
    :full-content-height="fullScreen"
    :card-padding="fullScreen"
    :apply-shadow="fullScreen"
  >
    <template #content>
      <div>
        <div v-if="!fullScreen">
          <!-- TODO: add client field -->
          <q-input
            :model-value="order.table.number || '-'"
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
            rows="1"
            autogrow
            class="q-mb-md"
          />
        </div>

        <div>
          <div v-for="dish of order.dishes" :key="dish.dishIdInOrder">
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
          <order-history class="q-mt-xl" :order="order"> </order-history>
        </div>
      </div>
    </template>
    <template #options>
      <div v-if="!order.paidDate" class="row justify-center q-gutter-sm">
        <q-btn
          color="primary"
          type="submit"
          @click="isPaymentModalOpen = true"
          class="q-px-xl q-py-sm"
          size="md"
        >
          {{ t.pay }}
        </q-btn>
      </div>
    </template>
  </OrderView>
  <PaymentModal
    v-model="isPaymentModalOpen"
    :total-cost="getOrderTotalCost(order.dishes)"
    :order-number="order.orderNumber"
    :order-id="order.id"
  />
</template>

<script setup lang="ts">
import { getOrderDishTotalCost, getOrderTotalCost } from "donut-shared";
import DishInOrder from "src/components/DishInOrder.vue";
import OrderHistory from "src/components/OrderHistory.vue";
import OrderView from "src/components/OrderView.vue";
import PaymentModal from "src/components/PaymentMethodsModal.vue";
import { computed, ref } from "vue";
import { IOrder } from "../../../shared/src/actions/orders";
import { useI18nStore } from "../lib/i18n";

const props = defineProps<{
  order: IOrder;
  fullScreen?: boolean;
}>();

const order = computed(() => props.order);
const totalCost = computed(() => getOrderTotalCost(order.value.dishes));
const t = useI18nStore();
const isPaymentModalOpen = ref(false);
</script>
