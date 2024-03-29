<template>
  <footer class="bg-white shadow-up-1 q-px-md q-py-md">
    <div class="row gap-md">
      <div class="row items-center q-pl-sm" style="flex: 0 0 25%">
        <LogoImage style="width: 130px" />
      </div>
      <address style="flex: 0 0 35%" class="row items-center">
        <div>
          <div class="row no-wrap items-center gap-xs q-mb-sm">
            <q-btn
              round
              dense
              outline
              icon="location_on"
              color="primary"
              size="md"
              @click="openMap"
              :title="t.showOnMap"
            >
              <common-tooltip>
                {{ t.showOnMap }}
              </common-tooltip>
            </q-btn>
            <div>
              {{ formatAddress(defaultSalePoint?.address) }}
            </div>
          </div>
          <div class="row no-wrap items-center gap-xs q-mb-sm">
            <q-btn
              outline
              round
              dense
              icon="call"
              color="primary"
              @click="call"
              :title="t.callUs"
            >
              <common-tooltip>
                {{ t.callUs }}
              </common-tooltip>
            </q-btn>
            <div>
              {{ formatPhoneNumber(defaultSalePoint?.phone || "") }}
            </div>
          </div>
          <div class="row no-wrap items-center gap-xs">
            <q-btn
              outline
              round
              dense
              icon="mail"
              color="primary"
              @click="writeEmail"
              :title="t.writeUsEmail"
            >
              <common-tooltip>
                {{ t.writeUsEmail }}
              </common-tooltip>
            </q-btn>
            <div>
              {{ defaultSalePoint?.email }}
            </div>
          </div>
        </div>
      </address>

      <div style="flex: 1 0 35%" class="row items-center">
        <div>
          <p class="text-weight-bold">{{ t.donutPosFooterTitle }}</p>
          <p class="text-dark-lighter">
            {{ t.donutPosFooterDescription }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { CHANNELS } from "donut-shared/src/constants/channels";
import CommonTooltip from "src/components/CommonTooltip.vue";
import LogoImage from "src/components/LogoImage.vue";
import { formatAddress, makeGoogleMapSearchQuery } from "src/lib/address";
import { useI18nStore } from "src/lib/i18n";
import { formatPhoneNumber } from "src/lib/phone";
import { useStore } from "src/store";
import { computed } from "vue";

const t = useI18nStore();
const store = useStore();
const channels = computed(() => {
  return [CHANNELS.DEFAULT_SALE_POINT];
});
useSubscription(channels, { store: store as any });
const defaultSalePoint = computed(
  () => store.state.salePoints.defaultSalePoint
);

function openMap() {
  window
    ?.open(
      `http://www.google.com/maps/place?q=${makeGoogleMapSearchQuery(
        defaultSalePoint.value?.address
      )}`,
      "_blank"
    )
    ?.focus();
}

function call() {
  window?.open(`tel:${defaultSalePoint.value?.phone}`);
}

function writeEmail() {
  window?.open(`mailto:${defaultSalePoint.value?.email}`);
}
</script>
