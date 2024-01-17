<template>
  <q-dialog maximized>
    <q-card class="q-pb-sm">
      <q-card-section class="row items-center">
        <q-space />
        <div class="text-h6">{{ t.addAddress }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-separator inset />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { IAddress } from "donut-shared";
import { useI18nStore } from "src/lib/i18n";

const t = useI18nStore();

const emit = defineEmits<{
  submit: [address: IAddress];
}>();
</script>
