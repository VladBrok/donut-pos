<template>
  <q-card-section>
    <p v-if="!isInitializing" class="text-h4 text-center q-mb-md">
      {{ isClient ? t.clickToPay : t.scanQrCode }}
    </p>
  </q-card-section>

  <q-card-section>
    <big-spinner v-if="isInitializing" />
    <div ref="qrCodeContainer" class="w-fit q-mx-auto"></div>
    <div v-if="!isInitializing && isClient">
      <q-btn
        color="primary"
        class="q-mx-auto d-block w-fit"
        :href="paymentLink"
      >
        {{ t.pay }}
      </q-btn>
    </div>
  </q-card-section>
</template>

<script setup lang="ts">
import { assert } from "donut-shared";
import { getPaymentLinkAction } from "donut-shared/src/actions/orders";
import { logError, logInfo } from "donut-shared/src/lib/log";
import QRCode from "qrcode";
import BigSpinner from "src/components/BigSpinner.vue";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "src/store";
import { computed, onMounted, ref } from "vue";

const props = defineProps<{
  orderNumber: string;
  method: "blik" | "card";
}>();

const t = useI18nStore();
const isInitializing = ref(false);
const store = useStore();
const paymentLink = computed(() => store.state.orders.paymentLink);
const qrCodeContainer = ref<HTMLDivElement>();
const isClient = computed(() => store.state.auth.user.permissions?.client);

onMounted(async () => {
  qrCodeContainer.value?.replaceChildren();
  isInitializing.value = true;

  try {
    await getPaymentLink();
    logInfo("paymentLink:", paymentLink.value);
    assert(paymentLink.value, "payment link was not received");

    if (isClient.value) {
      window.open(paymentLink.value, "_self");
    } else {
      try {
        const canvas = await QRCode.toCanvas(paymentLink.value, {
          errorCorrectionLevel: "M",
          version: 14,
          width: 280,
        });
        qrCodeContainer.value?.appendChild(canvas);
      } catch (err) {
        logError("QR code generation error:", err);
      }
    }
  } finally {
    isInitializing.value = false;
  }
});

async function getPaymentLink() {
  return await store.commit.sync(
    getPaymentLinkAction({
      orderNumber: props.orderNumber,
      method: props.method,
    })
  );
}
</script>
