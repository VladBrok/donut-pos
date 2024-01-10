<template>
  <q-btn
    :color="color"
    :disable="color === 'grey'"
    :loading="isUpdatingStatus"
    @click="updateStatus"
  >
    {{ label }}
  </q-btn>
</template>

<script setup lang="ts">
import {
  IOrder,
  finishCookingDishAction,
  startCookingDishAction,
} from "donut-shared/src/actions/orders";
import { QBtn } from "quasar";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "src/store";
import { computed, ref } from "vue";

const props = defineProps<{
  order: IOrder;
  dishInOrder: IOrder["dishes"][number];
}>();
const emit = defineEmits(["statusUpdated"]);

const t = useI18nStore();
const store = useStore();
const isUpdatingStatus = ref(false);
const color = computed(() =>
  !props.dishInOrder.status
    ? "primary"
    : props.dishInOrder.status === "cooking"
    ? "positive"
    : "grey"
);
const label = computed(() =>
  !props.dishInOrder.status
    ? t.value.startCooking
    : props.dishInOrder.status === "cooking"
    ? t.value.finishCooking
    : t.value.done
);

function updateStatus() {
  let promise: Promise<any> | null = null;
  isUpdatingStatus.value = true;

  if (!props.dishInOrder.status) {
    promise = store.commit.sync(
      startCookingDishAction({
        employeeId: props.order.employee?.id || "",
        clientId: props.order.client?.id || "",
        orderId: props.order.id || "",
        orderNumber: props.order.orderNumber || "",
        dishIdInOrder: props.dishInOrder.dishIdInOrder || "",
      })
    );
  } else {
    promise = store.commit.sync(
      finishCookingDishAction({
        orderId: props.order.id || "",
        orderNumber: props.order.orderNumber || "",
        dishIdInOrder: props.dishInOrder.dishIdInOrder || "",
      })
    );
  }

  promise.finally(() => {
    isUpdatingStatus.value = false;
    emit("statusUpdated");
  });
}
</script>
