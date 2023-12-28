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
        <q-list bordered separator class="rounded-borders">
          <q-item
            clickable
            v-ripple
            v-close-popup
            class="q-px-lg q-py-md"
            @click="isCashPaymentModalOpen = true"
          >
            <q-item-section avatar>
              <q-avatar
                color="primary"
                text-color="white"
                icon="monetization_on"
                size="md"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold text-h6">{{
                t.cash
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>

  <cash-payment-modal
    v-model="isCashPaymentModalOpen"
    @close="isCashPaymentModalOpen = false"
    :total-cost="totalCost"
    :order-number="orderNumber"
  />
</template>

<script setup lang="ts">
import CashPaymentModal from "src/components/CashPaymentModal.vue";
import { useI18nStore } from "src/lib/i18n";
import { ref } from "vue";

const props = defineProps<{
  totalCost: number;
  orderNumber: string;
}>();

const t = useI18nStore();
const isCashPaymentModalOpen = ref(false);
</script>
