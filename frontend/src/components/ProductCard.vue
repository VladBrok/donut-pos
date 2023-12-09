<template>
  <q-card :class="{ 'shadow-0': noShadow }" class="full-height">
    <div class="column no-wrap full-height">
      <q-card-section>
        <q-img
          :src="imageUrl"
          alt=""
          fit="cover"
          class="image-card shadow-3 rounded-borders"
        />
      </q-card-section>
      <div class="row justify-between q-px-md">
        <div class="q-mr-sm" :class="textClass">
          {{ textSize === "sm" ? cutText(name, 20) : name }}
          <q-tooltip v-if="textSize === 'sm'">
            {{ name }}
          </q-tooltip>
        </div>
        <div class="text-primary" :class="textClass">
          {{ formatCurrency(price) }}
        </div>
      </div>
      <slot />
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { cutText } from "../lib/cut-text";
import { formatCurrency } from "../lib/format-currency";

const props = defineProps<{
  price: number;
  name: string;
  imageUrl: string;
  noShadow?: boolean;
  textSize?: "sm" | "lg";
}>();

const textClass = computed(() => ({
  "text-h6": !props.textSize || props.textSize === "lg",
  "text-body1": props.textSize === "sm",
}));
</script>
