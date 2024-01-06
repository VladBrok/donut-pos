<template>
  <q-card :class="{ 'shadow-0': noShadow }" class="full-height">
    <div class="column no-wrap full-height">
      <q-card-section>
        <q-img
          :src="imageUrl"
          alt=""
          fit="cover"
          class="image-card shadow-3 rounded-borders product-card-image"
        >
          <div v-if="caption" class="absolute-full text-h6 flex flex-center">
            {{ caption }}
          </div>
        </q-img>
      </q-card-section>
      <div class="row justify-between q-px-md">
        <div class="q-mr-sm" :class="textClass">
          <div>
            {{ textSize === "sm" ? cutText(name, 20) : name }}
            <q-tooltip v-if="textSize === 'sm'">
              {{ name }}
            </q-tooltip>
          </div>
          <div class="text-body2 text-dark-gray">
            {{ formatWeightGram(weight) }}
          </div>
        </div>
        <div class="flex-grow text-right" :class="textClass">
          <span v-if="price" class="text-primary">{{
            formatCurrency(price)
          }}</span>
          <slot name="right" />
        </div>
      </div>
      <slot />
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { formatWeightGram } from "src/lib/weight";
import { computed } from "vue";
import { formatCurrency } from "../lib/currency";
import { cutText } from "../lib/cut-text";

const props = defineProps<{
  price?: number;
  weight: number;
  name: string;
  imageUrl: string;
  noShadow?: boolean;
  textSize?: "sm" | "lg";
  caption?: string;
}>();

const textClass = computed(() => ({
  "text-h5": !props.textSize || props.textSize === "lg",
  "text-h6": props.textSize === "sm",
}));
</script>
