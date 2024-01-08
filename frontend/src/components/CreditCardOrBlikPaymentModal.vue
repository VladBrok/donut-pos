<template>
  <q-dialog
    maximized
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <q-card class="q-pb-sm">
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup size="lg" />
      </q-card-section>

      <payment-qr-code
        v-if="modelValue"
        :order-number="orderNumber"
        :method="method"
      />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import PaymentQrCode from "src/components/PaymentQrCode.vue";
import { computed } from "vue";

const props = defineProps<{
  orderNumber: string;
  modelValue: boolean;
  method: "blik" | "card";
}>();
const emit = defineEmits(["update:modelValue"]);

const modelValue = computed(() => props.modelValue);
</script>
