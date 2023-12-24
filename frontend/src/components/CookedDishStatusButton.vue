<template>
  <q-btn color="primary" :loading="isUpdatingStatus" @click="updateStatus">
    {{ t.delivered }}
  </q-btn>
</template>

<script setup lang="ts">
import {
  ICookedDish,
  startDeliveredDishAction,
} from "donut-shared/src/actions/orders";
import { QBtn } from "quasar";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "src/store";
import { computed, ref } from "vue";

const props = defineProps<{
  cookedDish: ICookedDish;
}>();

const t = useI18nStore();
const store = useStore();
const isUpdatingStatus = ref(false);
const userId = computed(() => store.state.auth.user.userId);

function updateStatus() {
  isUpdatingStatus.value = true;
  store.commit
    .sync(
      startDeliveredDishAction({
        employeeId: userId.value || "",
        orderId: props.cookedDish.order.id,
        dishIdInOrder: props.cookedDish.dish.dishIdInOrder,
      })
    )
    .finally(() => {
      isUpdatingStatus.value = false;
    });
}
</script>
