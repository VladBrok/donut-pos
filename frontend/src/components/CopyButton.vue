<template>
  <q-btn
    flat
    color="dark-gray"
    dense
    rounded
    icon="content_copy"
    @click="copy(text)"
    :title="tooltip"
  >
    <q-tooltip>
      {{ tooltip }}
    </q-tooltip>
  </q-btn>
</template>

<script setup lang="ts">
import { Notify, copyToClipboard } from "quasar";
import { ERROR_TIMEOUT_MS, SUCCESS_TIMEOUT_MS } from "src/lib/constants";
import { useI18nStore } from "src/lib/i18n";
import { logError } from "../../../shared/src/lib/log";

defineProps<{
  text: string;
  tooltip: string;
}>();

const t = useI18nStore();

async function copy(text: string) {
  try {
    await copyToClipboard(text);
    Notify.create({
      type: "positive",
      position: "top",
      timeout: SUCCESS_TIMEOUT_MS,
      message: t.value.copyToClipboardSuccess,
      multiLine: true,
      group: false,
    });
  } catch (err) {
    logError("Copy to clipboard error:", err);
    Notify.create({
      type: "negative",
      position: "top",
      timeout: ERROR_TIMEOUT_MS,
      message: t.value.copyToClipboardError,
      multiLine: true,
      group: false,
    });
  }
}
</script>
