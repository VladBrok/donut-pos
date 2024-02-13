<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <q-card class="dialog-sm q-pb-md q-px-md">
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup :title="t.close" />
      </q-card-section>

      <q-card-section>
        <div class="text-center">
          <p class="text-h5 q-mb-lg">
            {{ t.payInCashUponReceipt }}
          </p>
          <q-btn
            :label="t.ok"
            color="primary"
            class="q-mx-auto d-block"
            v-close-popup
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useI18nStore } from "src/lib/i18n";
import { computed } from "vue";

const props = defineProps<{
  modelValue: boolean;
}>();
const modelValue = computed(() => props.modelValue);
const emit = defineEmits(["close", "update:modelValue"]);
const t = useI18nStore();
</script>
