<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <q-card class="dialog-sm q-pb-md q-px-md">
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <big-spinner v-if="isLoading" />

      <q-card-section v-else-if="isRequested">
        <div class="text-center">
          <p class="text-h5 q-mb-sm">
            {{ t.waiterWasCalled }}
          </p>
          <p class="text-body1 text-dark-gray q-mb-md">
            {{ t.waiterWillAcceptPayment }}
          </p>
          <q-btn
            :label="t.ok"
            color="primary"
            class="q-mx-auto d-block"
            v-close-popup
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { requestCashPaymentAction } from "donut-shared/src/actions/orders";
import BigSpinner from "src/components/BigSpinner.vue";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "src/store";
import { computed, ref, watch } from "vue";

const props = defineProps<{
  orderNumber: string;
  modelValue: boolean;
}>();
const modelValue = computed(() => props.modelValue);
const emit = defineEmits(["close", "update:modelValue"]);
const store = useStore();
const t = useI18nStore();
const isLoading = ref(false);
const isRequested = ref(false);

watch(
  modelValue,
  () => {
    if (!modelValue.value) {
      return;
    }

    isLoading.value = true;
    store.commit
      .sync(
        requestCashPaymentAction({
          orderNumber: props.orderNumber,
        })
      )
      .then(() => {
        isRequested.value = true;
      })
      .catch(() => {
        isRequested.value = false;
      })
      .finally(() => {
        isLoading.value = false;
      });
  },
  { immediate: true }
);
</script>
