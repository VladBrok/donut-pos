<template>
  <q-btn :color="color" :loading="isUpdatingStatus" @click="updateStatus">
    {{ label }}
  </q-btn>
</template>

<script setup lang="ts">
import {
  IOrder,
  courierStartDeliveringOrderAction,
  deliverOrderAction,
} from "donut-shared/src/actions/orders";
import { QBtn } from "quasar";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "src/store";
import { computed, ref } from "vue";

const props = defineProps<{
  order: IOrder;
}>();
const order = computed(() => props.order);
const emit = defineEmits(["statusUpdated"]);

const t = useI18nStore();
const store = useStore();
const isUpdatingStatus = ref(false);
const color = computed(() =>
  order.value.deliveringDate ? "positive" : "primary"
);
const label = computed(() =>
  order.value.deliveringDate
    ? t.value.finishDelivering
    : t.value.startDelivering
);

function updateStatus() {
  let promise: Promise<any> | null = null;
  isUpdatingStatus.value = true;

  if (order.value.deliveringDate) {
    promise = store.commit.sync(
      deliverOrderAction({
        orderId: order.value.id,
        isEmployee: true,
      })
    );
  } else {
    promise = store.commit.sync(
      courierStartDeliveringOrderAction({
        orderId: order.value.id,
      })
    );
  }

  promise.finally(() => {
    isUpdatingStatus.value = false;
    emit("statusUpdated");
  });
}
</script>
