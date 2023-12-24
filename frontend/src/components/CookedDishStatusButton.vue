<template>
  <q-btn color="primary" :loading="isUpdatingStatus" @click="updateStatus">
    {{ t.delivered }}
  </q-btn>
</template>

<script setup lang="ts">
import { ICookedDish } from "donut-shared/src/actions/orders";
import { QBtn } from "quasar";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "src/store";
import { ref } from "vue";

const props = defineProps<{
  cookedDish: ICookedDish;
}>();

const t = useI18nStore();
const store = useStore();
const isUpdatingStatus = ref(false);

function updateStatus() {
  // TODO: set dish status to "delivered"
  // let promise: Promise<any> | null = null;
  // isUpdatingStatus.value = true;
  // if (!props.dishInOrder.status) {
  //   promise = store.commit.sync(
  //     startCookingDishAction({
  //       orderId: props.order.id || "",
  //       orderNumber: props.order.orderNumber || "",
  //       dishIdInOrder: props.dishInOrder.dishIdInOrder || "",
  //     })
  //   );
  // } else {
  //   promise = store.commit.sync(
  //     finishCookingDishAction({
  //       orderId: props.order.id || "",
  //       orderNumber: props.order.orderNumber || "",
  //       dishIdInOrder: props.dishInOrder.dishIdInOrder || "",
  //     })
  //   );
  // }
  // promise.finally(() => {
  //   isUpdatingStatus.value = false;
  // });
}
</script>
