<template>
  <div class="row no-wrap gap-md q-py-md q-px-xs items-center">
    <div class="flex-grow">
      <div class="text-body2">
        <p class="text-h6 q-mb-xs">
          {{ t.orderReady }}
        </p>
        <OrderNumberTitle :order-number="order.order.orderNumber" is-link />
        <div
          v-if="defaultSalePoint"
          class="text-body2 q-mt-xs row no-wrap items-center gap-sm"
        >
          <div>
            <p>{{ t.pickOrderUp }}</p>
            <p class="text-weight-bold">
              {{ formatAddress(defaultSalePoint.address) }}
            </p>
          </div>
          <q-btn
            round
            dense
            icon="location_on"
            color="primary"
            size="md"
            @click="openMap"
          >
            <q-tooltip>
              {{ t.showOnMap }}
            </q-tooltip>
          </q-btn>
        </div>
      </div>
      <div>
        <div class="q-mt-md row gap-sm justify-between">
          <q-btn
            v-if="!order.order.paidDate"
            color="primary"
            @click="isPaymentModalOpen = true"
          >
            {{ t.pay }}
          </q-btn>
          <div v-else>
            <p class="text-body2 q-mb-sm">
              {{ t.orderReceiveInstruction }}
            </p>
            <q-btn color="primary" @click="orderDelivered" :loading="isLoading">
              {{ t.confirmOrderReceived }}
            </q-btn>
          </div>
        </div>
      </div>
    </div>
    <PaymentMethodsModal
      v-model="isPaymentModalOpen"
      :order-number="order.order.orderNumber"
      :order-id="order.order.id"
      :order-type="order.order.type"
    />
  </div>
</template>

<script setup lang="ts">
import {
  ICookedOrder,
  deliverOrderAction,
} from "donut-shared/src/actions/orders";
import OrderNumberTitle from "src/components/OrderNumberTitle.vue";
import PaymentMethodsModal from "src/components/PaymentMethodsModal.vue";
import { formatAddress, makeGoogleMapSearchQuery } from "src/lib/address";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "src/store";
import { computed, ref } from "vue";

const props = defineProps<{
  order: ICookedOrder;
}>();

const t = useI18nStore();
const store = useStore();
const isPaymentModalOpen = ref(false);
const isLoading = ref(false);
const defaultSalePoint = computed(
  () => store.state.salePoints.defaultSalePoint
);

function openMap() {
  window
    ?.open(
      `http://www.google.com/maps/place?q=${makeGoogleMapSearchQuery(
        defaultSalePoint.value?.address
      )}`,
      "_blank"
    )
    ?.focus();
}

function orderDelivered() {
  isLoading.value = true;
  store.commit
    .sync(
      deliverOrderAction({
        orderId: props.order.order.id,
      })
    )
    .finally(() => {
      isLoading.value = false;
    });
}
</script>
