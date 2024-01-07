<template>
  <!-- TODO: add neat icon -->
  <div class="row no-wrap gap-md q-py-md q-px-xs items-center">
    <div class="flex-grow">
      <div class="text-body2">
        <p class="text-h6 q-mb-xs">
          {{ t.orderReady }}
        </p>
        <OrderNumberTitle :order-number="order.order.orderNumber" is-link />
        <!-- TODO: show restaurant address -->
        <p class="text-body2 q-mt-xs">
          {{ t.pickOrderUp }}
        </p>
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
import { ICookedOrder } from "donut-shared/src/actions/orders";
import OrderNumberTitle from "src/components/OrderNumberTitle.vue";
import PaymentMethodsModal from "src/components/PaymentMethodsModal.vue";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "src/store";
import { onMounted, ref } from "vue";

const props = defineProps<{
  order: ICookedOrder;
}>();

const t = useI18nStore();
const store = useStore();
const isPaymentModalOpen = ref(false);

onMounted(() => {
  console.log(props.order.order);
});
</script>
