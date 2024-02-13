<template>
  <OrderView
    :has-content="Boolean(order)"
    :dish-count="getDishesInOrderCount(order)"
    :total-cost="totalCost"
    :delivery-cost="DELIVERY_COST"
    :dish-cost="dishesCost"
    :full-content-height="fullScreen"
    :card-padding="fullScreen"
    :apply-shadow="fullScreen"
    :order-type="order.type"
  >
    <template #content>
      <PrintButton
        v-if="!isClient"
        class="q-mb-md"
        :allow-print-ticket="order.type === ORDER_TYPES.TAKEOUT"
      />
      <div>
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
            v-if="order.type === ORDER_TYPES.DELIVERY"
            :model-value="formatAddress(order.address)"
            readonly
            stack-label
            :label="`${t.deliveryAddress}`"
            type="text"
            class="q-mb-md w-fit"
          >
            <template v-slot:after>
              <q-btn
                round
                dense
                icon="location_on"
                color="primary"
                @click="openMap"
                :title="t.showOnMap"
              >
                <q-tooltip>
                  {{ t.showOnMap }}
                </q-tooltip>
              </q-btn>
            </template>
          </q-input>
          <q-input
            v-if="order.type === ORDER_TYPES.DINE_IN"
            :model-value="order.table?.number || '-'"
            readonly
            stack-label
            :label="`${t.tableNumberLabel}`"
            type="text"
            class="q-mb-md"
          />
          <q-input
            :model-value="order.comment || '-'"
            stack-label
            :label="`${t.commentLabel}`"
            type="textarea"
            readonly
            rows="1"
            autogrow
            class="q-mb-md"
          />
        </div>

        <div
          class="no-wrap"
          :class="{
            'order-details-flex': fullScreen,
          }"
        >
          <div class="flex-basis-50">
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
          </div>
          <order-history class="q-mt-xl" :order="order" />
        </div>
      </div>
    </template>
    <template #options>
      <div v-if="!order.paidDate" class="row justify-center">
        <q-btn
          color="primary"
          type="submit"
          @click="isPaymentModalOpen = true"
          class="q-px-lg q-py-xs"
          size="md"
        >
          {{ t.pay }}
        </q-btn>
      </div>
    </template>
  </OrderView>
  <PaymentMethodModal
    v-model="isPaymentModalOpen"
    :total-cost="totalCost"
    :order-number="order.orderNumber"
    :order-id="order.id"
    :order-type="order.type"
  />
</template>

<script setup lang="ts">
import {
  DELIVERY_COST,
  ORDER_TYPES,
  getDishesInOrderCount,
  getDishesTotalCost,
  getOrderDishTotalCost,
  getOrderTotalCost,
} from "donut-shared";
import DishInOrder from "src/components/DishInOrder.vue";
import OrderHistory from "src/components/OrderHistory.vue";
import OrderView from "src/components/OrderView.vue";
import PaymentMethodModal from "src/components/PaymentMethodsModal.vue";
import PrintButton from "src/components/PrintButton.vue";
import { formatAddress, makeGoogleMapSearchQuery } from "src/lib/address";
import { getOrderTypeIcon } from "src/lib/get-order-type-icon";
import { useStore } from "src/store";
import { computed, ref } from "vue";
import { IOrder } from "../../../shared/src/actions/orders";
import { useI18nStore } from "../lib/i18n";

const props = defineProps<{
  order: IOrder;
  fullScreen?: boolean;
}>();

const order = computed(() => props.order);
const totalCost = computed(() => getOrderTotalCost(order.value));
const dishesCost = computed(() => getDishesTotalCost(order.value));
const t = useI18nStore();
const isPaymentModalOpen = ref(false);
const store = useStore();
const isClient = computed(() => store.state.auth.user.permissions?.client);

function openMap() {
  window
    ?.open(
      `http://www.google.com/maps/place?q=${makeGoogleMapSearchQuery(
        order.value.address
      )}`,
      "_blank"
    )
    ?.focus();
}
</script>
