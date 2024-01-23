<template>
  <OrderView
    :key="order.id"
    has-content
    card-padding
    apply-shadow
    full-content-height
    :order-type="order.type"
  >
    <template #content>
      <order-number-title
        :order-number="order.orderNumber"
        class="text-h6 q-mb-sm"
        copy-button-size="sm"
      />
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
            <q-btn round dense icon="call" color="primary" @click="callClient">
              <q-tooltip>
                {{ t.callClient }}
              </q-tooltip>
            </q-btn>
          </template>
        </q-input>
        <!-- <q-input
          :model-value="order.comment || '-'"
          stack-label
          :label="`${t.commentLabel}`"
          lazy-rules
          type="textarea"
          readonly
          rows="1"
          autogrow
          class="q-mb-md"
        /> -->
      </div>
    </template>
  </OrderView>
</template>

<script setup lang="ts">
import { IOrder } from "donut-shared/src/actions/orders";
import OrderNumberTitle from "src/components/OrderNumberTitle.vue";
import OrderView from "src/components/OrderView.vue";
import { formatAddress, makeGoogleMapSearchQuery } from "src/lib/address";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "src/store";
import { computed } from "vue";

const props = defineProps<{
  order: IOrder;
}>();

const t = useI18nStore();
const store = useStore();
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
