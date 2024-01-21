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
          class="scroll overflow-x-hidden"
          :class="{
            'order-view-content-height': !fullContentHeight,
          }"
        >
          <slot name="content" />
        </div>

        <template v-if="dishCount">
          <div>
            <q-separator />
            <div>
              <div>
                <div class="q-mt-sm">
                  <div
                    v-if="dishCost != null"
                    class="row justify-between gap-sm"
                  >
                    <div class="text-h6">
                      {{ t.totalDishes(dishCount) }}
                    </div>
                    <div class="text-weight-medium text-h6">
                      {{ formatCurrency(dishCost) }}
                    </div>
                  </div>
                  <div
                    v-if="deliveryCost != null && orderType === 'delivery'"
                    class="row justify-between gap-sm"
                  >
                    <div class="text-h6">
                      {{ t.delivery }}
                    </div>
                    <div class="text-weight-medium text-h6">
                      {{ formatCurrency(deliveryCost) }}
                    </div>
                  </div>
                  <div
                    v-if="totalCost != null"
                    class="row justify-between gap-sm q-mb-sm"
                  >
                    <div class="text-h6">
                      {{ t.totalCost }}
                    </div>
                    <div class="text-weight-medium text-h6">
                      {{ formatCurrency(totalCost) }}
                    </div>
                  </div>
                </div>
              </div>

              <slot name="options" />
            </div>
          </div>
        </template>
      </div>
    </q-card>
    <slot v-else-if="customEmpty" name="empty" />
    <no-data v-else-if="!customEmpty" class="q-mt-xl" :text="t.emptyOrder" />
  </div>
</template>

<script setup lang="ts">
import { OrderType } from "donut-shared";
import { formatCurrency } from "src/lib/currency";
import { useI18nStore } from "../lib/i18n";
import NoData from "./NoData.vue";

defineProps<{
  orderType: OrderType;
  hasContent: boolean;
  totalCost?: number;
  dishCost?: number;
  deliveryCost?: number;
  cardPadding?: boolean;
  applyShadow?: boolean;
  fullContentHeight?: boolean;
  dishCount?: number;
  customEmpty?: boolean;
}>();

const t = useI18nStore();
</script>
