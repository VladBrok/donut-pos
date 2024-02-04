<template>
  <div>
    <apexchart
      width="380"
      type="donut"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const series = computed(() => [44, 55, 41]);
const options = computed(() => ({
  labels: ["Apple", "Mango", "Orange"],
}));
</script>
