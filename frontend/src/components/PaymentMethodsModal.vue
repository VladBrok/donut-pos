<template>
  <q-dialog v-bind="$attrs">
    <q-card class="dialog-sm q-pb-md q-px-md">
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <p class="text-h5 text-center">
          {{ t.selectPaymentMethod }}
        </p>
      </q-card-section>

      <q-card-section>
        <PaymentMethodCard
          image-src="/src/assets/cash.svg"
          @click="isCashPaymentModalOpen = true"
        >
          <template #text>
            {{ t.cash }}
          </template>
        </PaymentMethodCard>

        <PaymentMethodCard
          class="q-mt-lg"
          image-src="/src/assets/credit-card.svg"
          @click="
            method = 'card';
            isCreditOrBlikPaymentModalOpen = true;
          "
        >
          <template #text> {{ t.creditCard }} </template>
        </PaymentMethodCard>

        <PaymentMethodCard
          class="q-mt-lg"
          image-src="/src/assets/blik.png"
          @click="
            method = 'blik';
            isCreditOrBlikPaymentModalOpen = true;
          "
        >
          <template #text> {{ t.blik }} </template>
        </PaymentMethodCard>
      </q-card-section>
    </q-card>
  </q-dialog>

  <waiter-cash-payment-modal
    v-if="!isClient"
    v-model="isCashPaymentModalOpen"
    @close="isCashPaymentModalOpen = false"
    :total-cost="totalCost"
    :order-number="orderNumber"
  />

  <client-cash-payment-modal
    v-if="isClient"
    v-model="isCashPaymentModalOpen"
    @close="isCashPaymentModalOpen = false"
    :total-cost="totalCost"
    :order-id="orderId"
  />

  <CreditCardOrBlikPaymentModal
    v-model="isCreditOrBlikPaymentModalOpen"
    :total-cost="totalCost"
    :order-number="orderNumber"
    :method="method"
  />
</template>

<script setup lang="ts">
import ClientCashPaymentModal from "src/components/ClientCashPaymentModal.vue";
import CreditCardOrBlikPaymentModal from "src/components/CreditCardOrBlikPaymentModal.vue";
import PaymentMethodCard from "src/components/PaymentMethodCard.vue";
import WaiterCashPaymentModal from "src/components/WaiterCashPaymentModal.vue";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "src/store";
import { computed, ref } from "vue";

defineProps<{
  totalCost: number;
  orderNumber: string;
  orderId: string;
}>();

const t = useI18nStore();
const isCashPaymentModalOpen = ref(false);
const isCreditOrBlikPaymentModalOpen = ref(false);
const method = ref<"card" | "blik">("card");
const store = useStore();
const isClient = computed(() => store.state.auth.user.permissions?.client);
</script>