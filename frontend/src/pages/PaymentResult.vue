<template>
  <div
    class="q-pa-md bg-gray-lightest min-height-window row justify-center items-center"
  >
    <div class="q-mx-auto max-w-lg text-center">
      <q-icon
        :name="icon"
        style="font-size: 110px"
        :color="iconColor"
        class="q-mb-sm"
      />
      <h1 class="text-h5">
        <slot name="text" />
      </h1>
      <p class="q-mt-xl">
        <q-btn color="primary" :to="'/menu'">
          {{ t.goToMenu }}
        </q-btn>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18nStore } from "src/lib/i18n";
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  isSuccess: boolean;
}>();
const icon = computed(() => (props.isSuccess ? "task_alt" : "cancel"));
const iconColor = computed(() => (props.isSuccess ? "positive" : "negative"));

const router = useRouter();
const t = useI18nStore();
</script>
