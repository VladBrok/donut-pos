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
          <!-- TODO: extract list item component and add good svg icons -->
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

        <q-list bordered separator class="rounded-borders q-mt-md">
          <q-item
            clickable
            v-ripple
            v-close-popup
            class="q-px-lg q-py-md"
            @click="
              method = 'card';
              isCreditOrBlikPaymentModalOpen = true;
            "
          >
            <q-item-section avatar>
              <q-avatar
                color="primary"
                text-color="white"
                icon="credit_card"
                size="md"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold text-h6">{{
                t.creditCard
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-list bordered separator class="rounded-borders q-mt-md">
          <q-item
            clickable
            v-ripple
            v-close-popup
            class="q-px-lg q-py-md"
            @click="
              method = 'blik';
              isCreditOrBlikPaymentModalOpen = true;
            "
          >
            <q-item-section avatar>
              <q-avatar
                color="primary"
                text-color="white"
                icon="subtitles"
                size="md"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold text-h6">{{
                t.blik
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
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
    :order-number="orderNumber"
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
import WaiterCashPaymentModal from "src/components/WaiterCashPaymentModal.vue";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "src/store";
import { computed, ref } from "vue";

defineProps<{
  totalCost: number;
  orderNumber: string;
}>();

const t = useI18nStore();
const isCashPaymentModalOpen = ref(false);
const isCreditOrBlikPaymentModalOpen = ref(false);
const method = ref<"card" | "blik">("card");
const store = useStore();
const isClient = computed(() => store.state.auth.user.permissions?.client);
</script>
