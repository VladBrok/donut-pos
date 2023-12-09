<template>
  <div class="full-height">
    <q-card v-if="order" class="full-height shadow-0">
      <q-form @submit="onSubmit">
        <div class="restricted-height scroll">
          {{ JSON.stringify(order, undefined, 2) }}
        </div>
        <div class="q-mt-lg">
          <!-- TODO: add client autotomplete field -->
          <q-input
            v-model.trim="tableNumber"
            stack-label
            :label="`${t.tableNumberLabel}`"
            lazy-rules
            type="text"
            :rules="[
              (val) =>
                !val ||
                val.length <= TABLE_NUMBER_MAX_LENGTH ||
                t.maxLength({ max: TABLE_NUMBER_MAX_LENGTH }),
            ]"
          />
          <q-input
            v-model="comment"
            stack-label
            :label="`${t.commentLabel}`"
            lazy-rules
            type="textarea"
            :rules="[
              (val) =>
                !val ||
                val.length <= COMMENT_MAX_LENGTH ||
                t.maxLength({ max: COMMENT_MAX_LENGTH }),
            ]"
          />
        </div>
        <div class="row justify-end q-gutter-sm q-mt-md">
          <q-btn
            color="dark"
            flat
            @click="isConfirmClearOpen = true"
            type="button"
          >
            {{ t.clearOrder }}
          </q-btn>
          <q-btn color="primary" type="submit">
            {{ t.createOrder }}
          </q-btn>
        </div>
      </q-form>
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
import {
  clearCurrentOrderAction,
  COMMENT_MAX_LENGTH,
  TABLE_NUMBER_MAX_LENGTH,
} from "donut-shared";
import { computed, ref } from "vue";
import { logInfo } from "../../../shared/src/lib/log";
import { useI18nStore } from "../lib/i18n";
import { useStore } from "../store";
import ConfirmDialog from "./ConfirmDialog.vue";
import NoData from "./NoData.vue";

const store = useStore();
const order = computed(() => store.state.currentOrder.order);
const t = useI18nStore();

const isConfirmClearOpen = ref(false);
const tableNumber = ref("");
const comment = ref("");

function clear() {
  store.commit.crossTab(clearCurrentOrderAction());
  isConfirmClearOpen.value = false;
}

function onSubmit() {
  logInfo("create order");
}
</script>
