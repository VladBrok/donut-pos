<template>
  <div>
    <OrderView
      :key="order.id"
      has-content
      card-padding
      apply-shadow
      full-content-height
      :order-type="order.type"
    >
      <template #content>
        <div class="full-height column">
          <order-number-title
            :order-number="order.orderNumber"
            class="text-h6 q-mb-sm"
            is-link
          />
          <div class="flex-grow column justify-between">
            <div>
              <q-input
                :model-value="formatAddress(order.address)"
                readonly
                stack-label
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
                v-if="order.employee"
                :model-value="order.client?.phone"
                readonly
                stack-label
                type="text"
                class="q-mb-md w-fit"
                label-slot
              >
                <template v-slot:label>
                  <p>
                    <span class="text-dark text-h6 text-weight-bold">{{
                      order.client?.firstName
                    }}</span>
                  </p>
                </template>
                <template v-slot:after>
                  <q-btn
                    round
                    dense
                    icon="call"
                    color="secondary"
                    @click="callClient"
                    :title="t.callClient"
                  >
                    <q-tooltip>
                      {{ t.callClient }}
                    </q-tooltip>
                  </q-btn>
                </template>
              </q-input>
            </div>
            <div class="row gap-sm q-py-xs">
              <CourierOrderStatusButton
                v-if="order.paidDate || !order.deliveringDate"
                :order="order"
              />
              <q-btn
                v-if="!order.paidDate && order.employee"
                color="primary"
                @click="isPaymentModalOpen = true"
              >
                {{ t.pay }}
              </q-btn>
            </div>
          </div>
        </div>
      </template>
    </OrderView>
    <PaymentMethodsModal
      v-model="isPaymentModalOpen"
      :order-number="order.orderNumber"
      :order-id="order.id"
      :order-type="order.type"
      :total-cost="getOrderTotalCost(order)"
    />
  </div>
</template>

<script setup lang="ts">
import { getOrderTotalCost } from "donut-shared";
import { IOrder } from "donut-shared/src/actions/orders";
import CourierOrderStatusButton from "src/components/CourierOrderStatusButton.vue";
import OrderNumberTitle from "src/components/OrderNumberTitle.vue";
import OrderView from "src/components/OrderView.vue";
import PaymentMethodsModal from "src/components/PaymentMethodsModal.vue";
import { formatAddress, makeGoogleMapSearchQuery } from "src/lib/address";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "src/store";
import { computed, ref } from "vue";

const props = defineProps<{
  order: IOrder;
}>();

const t = useI18nStore();
const store = useStore();
const isPaymentModalOpen = ref(false);
const order = computed(() => props.order);

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

function callClient() {
  window?.open(`tel:${order.value.client?.phone}`);
}
</script>
