<template>
  <div class="q-mt-xl">
    <div class="text-center">
      <div class="text-h2">
        <p>
          {{ t.cafe }}
        </p>
        <p>
          {{ t.cafeName }}
        </p>
      </div>
      <div class="row justify-center items-center q-mt-xl gap-sm">
        <img src="/images/fork.png" alt="" class="no-shadow knife-fork-image" />
        <div ref="qrCodeContainer" class=""></div>
        <img
          src="/images/knife.png"
          alt=""
          class="no-shadow knife-fork-image"
        />
      </div>
      <p class="text-h4 q-mt-sm">
        {{ t.scanToOrder }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { assert } from "donut-shared";
import { logError } from "donut-shared/src/lib/log";
import QRCode from "qrcode";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "src/store";
import { computed, ref, watch } from "vue";

const link = computed(() => "http://localhost:9000/menu?table=25");
const t = useI18nStore();
const store = useStore();
const qrCodeContainer = ref<HTMLDivElement>();

watch(
  link,
  async () => {
    if (!link.value) {
      return;
    }

    try {
      const canvas = await QRCode.toCanvas(link.value, {
        errorCorrectionLevel: "M",
        version: 3,
        width: 320,
      });
      assert(
        qrCodeContainer.value,
        "Expected qr code container html element to be present"
      );
      qrCodeContainer.value.appendChild(canvas);
    } catch (err) {
      logError("QR code generation error:", err);
    }
  },
  { immediate: true }
);
</script>
