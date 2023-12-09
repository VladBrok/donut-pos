<template>
  <div class="full-height">
    <q-card v-if="order" class="full-height shadow-0">
      <div class="restricted-height scroll">
        {{ JSON.stringify(order, undefined, 2) }}
      </div>
      <div>
        <!-- TODO: add client -->
      </div>
      <div class="row justify-end q-gutter-sm q-mt-md">
        <q-btn color="dark" flat @click="isConfirmClearOpen = true">
          {{ t.clearOrder }}
        </q-btn>
        <q-btn color="primary">
          {{ t.createOrder }}
        </q-btn>
      </div>
    </q-card>
    <no-data v-else class="q-mt-xl" :text="t.emptyOrder"> </no-data>
  </div>

  <confirm-dialog v-model="isConfirmClearOpen">
    <template #body> {{ t.confirmCurrentOrderClear }}? </template>
    <template #confirmButton>
      <q-btn flat :label="t.clearOrder" color="negative" @click="clear" />
    </template>
  </confirm-dialog>
</template>

<script setup lang="ts">
import { clearCurrentOrderAction } from "donut-shared";
import { computed, ref } from "vue";
import { useI18nStore } from "../lib/i18n";
import { useStore } from "../store";
import ConfirmDialog from "./ConfirmDialog.vue";
import NoData from "./NoData.vue";

const store = useStore();
const order = computed(() => store.state.currentOrder.order);
const t = useI18nStore();

const isConfirmClearOpen = ref(false);

function clear() {
  store.commit.crossTab(clearCurrentOrderAction());
  isConfirmClearOpen.value = false;
}
</script>
