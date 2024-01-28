<template>
  <q-btn-dropdown color="primary" :label="t.print" icon="print" outline>
    <q-list>
      <q-item
        v-if="allowPrintTicket"
        clickable
        v-close-popup
        @click="printTicket"
      >
        <q-item-section>
          <q-item-label>{{ t.printTicket }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-close-popup @click="printReceipt">
        <q-item-section>
          <q-item-label>{{ t.printReceipt }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import { useI18nStore } from "src/lib/i18n";

defineProps<{
  allowPrintTicket: boolean;
}>();

const t = useI18nStore();

function printTicket() {
  console.log("print ticket");
}

function printReceipt() {
  console.log("print receipt");
}
</script>
