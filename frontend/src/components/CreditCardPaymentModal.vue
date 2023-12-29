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

      <q-card-section>
        <p v-if="!isInitializing" class="text-h4 text-center q-mb-md">
          {{ t.scanQrCode }}
        </p>
      </q-card-section>

      <q-card-section>
        <big-spinner v-if="isInitializing" />
        <div ref="qrCodeContainer" class="w-fit q-mx-auto"></div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { assert } from "donut-shared";
import { getCreditCardPaymentLinkAction } from "donut-shared/src/actions/orders";
import { logError } from "donut-shared/src/lib/log";
import QRCode from "qrcode";
import BigSpinner from "src/components/BigSpinner.vue";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "src/store";
import { computed, ref, watch } from "vue";

const props = defineProps<{
  totalCost: number;
  orderNumber: string;
  modelValue: boolean;
}>();
const emit = defineEmits(["close", "update:modelValue"]);

const t = useI18nStore();
const isInitializing = ref(false);
const store = useStore();
const modelValue = computed(() => props.modelValue);
const paymentLink = computed(() => store.state.orders.creditCardPaymentLink);
const qrCodeContainer = ref<HTMLDivElement>();

watch(
  modelValue,
  async () => {
    if (!modelValue.value) {
      return;
    }

    qrCodeContainer.value?.replaceChildren();
    isInitializing.value = true;
    try {
      await getPaymentLink();
    } catch {
      isInitializing.value = false;
    }
  },
  { immediate: true }
);

watch(
  paymentLink,
  async () => {
    console.log("watch payment link", paymentLink.value);
    if (!paymentLink.value) {
      return;
    }

    try {
      const canvas = await QRCode.toCanvas(paymentLink.value, {
        errorCorrectionLevel: "M",
        version: 14,
        width: 280,
      });
      assert(
        qrCodeContainer.value,
        "Expected qr code container html element to be present"
      );
      qrCodeContainer.value.appendChild(canvas);
    } catch (err) {
      logError("QR code generation error:", err);
    } finally {
      isInitializing.value = false;
    }
  },
  { immediate: true }
);

async function getPaymentLink() {
  store.commit.sync(
    getCreditCardPaymentLinkAction({
      orderNumber: props.orderNumber,
    })
  );
}
</script>
