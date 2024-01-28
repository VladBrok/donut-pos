<template>
  <footer class="bg-white shadow-up-1 q-px-md q-py-md">
    <div class="row gap-md footer-inner-container">
      <div class="row items-center q-pl-sm" style="flex: 0 0 25%">
        <LogoImage style="width: 130px" />
      </div>
      <div style="flex: 0 0 35%" class="row items-center">
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
            >
              <q-tooltip>
                {{ t.showOnMap }}
              </q-tooltip>
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
            >
              <q-tooltip>
                {{ t.callUs }}
              </q-tooltip>
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
            >
              <q-tooltip>
                {{ t.writeUsEmail }}
              </q-tooltip>
            </q-btn>
            <div>
              {{ defaultSalePoint?.email }}
            </div>
          </div>
        </div>
      </div>

      <div style="flex: 1 0 35%">
        <p class="text-weight-bold">{{ t.donutPosFooterTitle }}</p>
        <p class="text-dark-lighter">
          {{ t.donutPosFooterDescription }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { CHANNELS } from "donut-shared/src/constants/channels";
import { ANONYMOUS } from "donut-shared/src/constants/misc";
import LogoImage from "src/components/LogoImage.vue";
import { formatAddress, makeGoogleMapSearchQuery } from "src/lib/address";
import { useI18nStore } from "src/lib/i18n";
import { formatPhoneNumber } from "src/lib/phone";
import { useStore } from "src/store";
import { computed, ref } from "vue";

const t = useI18nStore();
const store = useStore();
const userId = ref(store.state.auth.user.userId);
const channels = computed(() => {
  return userId.value === ANONYMOUS.userId ? [] : [CHANNELS.DEFAULT_SALE_POINT];
});
let isSubscribing = useSubscription(channels, { store: store as any });
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
