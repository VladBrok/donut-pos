<template>
  <div class="full-height">
    <q-card
      v-if="hasContent"
      class="full-height"
      :class="{
        'q-pa-lg': cardPadding,
        'shadow-0': !applyShadow,
      }"
    >
      <div>
        <div
          class="scroll"
          :class="{
            'order-view-content-height': !fullContentHeight,
          }"
        >
          <slot name="content" />
        </div>

        <template v-if="dishCount">
          <div>
            <q-separator />
            <div class="row justify-between gap-sm q-pt-md q-mb-sm">
              <div class="text-h5">
                {{ t.totalDishes(dishCount) }}
              </div>
              <div class="text-weight-medium text-h5">
                {{ formatCurrency(totalCost) }}
              </div>
            </div>
          </div>

          <slot name="options" />
        </template>
      </div>
    </q-card>
    <no-data v-else class="q-mt-xl" :text="t.emptyOrder"> </no-data>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency } from "src/lib/currency";
import { useI18nStore } from "../lib/i18n";
import NoData from "./NoData.vue";

defineProps<{
  hasContent: boolean;
  totalCost: number;
  cardPadding?: boolean;
  applyShadow?: boolean;
  fullContentHeight?: boolean;
  dishCount?: number;
}>();

const t = useI18nStore();
</script>