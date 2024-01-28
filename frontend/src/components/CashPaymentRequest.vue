<template>
  <div class="row no-wrap gap-md q-py-md q-px-xs items-center">
    <div class="flex-grow">
      <div class="text-body2">
        <div class="q-mb-xs row no-wrap items-center justify-between">
          <p class="text-subtitle1 text-weight-bold">
            {{ t.cashPaymentRequest }}
          </p>
          <NotificationTime :time="request.requestedAt" />
        </div>
        <div>
          {{ t.tableNumber }}
          {{ request.table.number || "-" }},
        </div>
        <OrderNumberTitle :order-number="request.orderNumber" is-link />
      </div>
      <div>
        <div class="q-mt-md row gap-sm justify-between">
          <q-btn
            color="primary"
            @click="isModalOpen = true"
            :loading="isDeleting"
          >
            {{ t.acceptPayment }}
          </q-btn>
          <div class="text-primary text-h5 q-pr-sm">
            {{ formatCurrency(request.totalCost) }}
          </div>
        </div>
      </div>
    </div>
    <waiter-cash-payment-modal
      v-model="isModalOpen"
      @close="isModalOpen = false"
      :total-cost="request.totalCost"
      :order-number="request.orderNumber"
      @paid="handlePaid"
    />
  </div>
</template>

<script setup lang="ts">
import {
  ICashPaymentRequest,
  deleteCashPaymentRequestAction,
} from "donut-shared";
import NotificationTime from "src/components/NotificationTime.vue";
import OrderNumberTitle from "src/components/OrderNumberTitle.vue";
import WaiterCashPaymentModal from "src/components/WaiterCashPaymentModal.vue";
import { formatCurrency } from "src/lib/currency";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "src/store";
import { ref } from "vue";

const props = defineProps<{
  request: ICashPaymentRequest;
}>();

const t = useI18nStore();
const store = useStore();
const isModalOpen = ref(false);
const isDeleting = ref(false);

const handlePaid = () => {
  isDeleting.value = true;
  store.commit
    .sync(
      deleteCashPaymentRequestAction({
        id: props.request.id,
      })
    )
    .finally(() => {
      isDeleting.value = false;
    });
};
</script>
