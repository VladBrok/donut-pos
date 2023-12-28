<template>
  <q-dialog>
    <q-card class="dialog-sm q-pb-md q-px-md">
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <p class="text-h5 text-center">
          {{ t.payWithCash }}
        </p>
      </q-card-section>

      <q-card-section>
        <p class="text-h5">
          {{ t.totalToPay }}:
          <span class="text-primary">{{ formatCurrency(totalCost) }}</span>
        </p>
      </q-card-section>

      <q-form @submit="onSubmit" @validation-error="onFormValidationError">
        <q-card-section>
          <q-input
            v-model.number="givenAmount"
            stack-label
            :label="`${t.amount} *`"
            :hint="t.amountHint"
            lazy-rules
            type="number"
            step="0.01"
            :rules="[
              (val) => val !== '' || t.fieldRequired,
              (val) =>
                wholeToFractional(val) >= totalCost ||
                t.minValue({ min: formatCurrency(totalCost) }),
            ]"
          />
        </q-card-section>

        <q-card-section>
          <p class="text-h5">
            {{ t.change }}:
            <span v-if="change > 0" class="text-primary">{{
              formatCurrency(change)
            }}</span>
            <span v-else>-</span>
          </p>
          <p v-show="change > 0" class="text-caption text-negative q-mt-xs">
            {{ t.makeSureChangeGiven }}
          </p>
        </q-card-section>

        <q-card-section align="center">
          <q-btn
            color="primary"
            type="submit"
            class="q-px-lg"
            :loading="isSubmitting"
          >
            {{ t.pay }}
          </q-btn>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { payForOrderAction } from "donut-shared/src/actions/orders";
import { Notify } from "quasar";
import { SUCCESS_TIMEOUT_MS } from "src/lib/constants";
import { formatCurrency, wholeToFractional } from "src/lib/currency";
import { useI18nStore } from "src/lib/i18n";
import { onFormValidationError } from "src/lib/on-form-validation-error";
import { useStore } from "src/store";
import { computed, ref } from "vue";

const props = defineProps<{
  totalCost: number;
  orderNumber: string;
}>();
const emit = defineEmits(["close"]);

const t = useI18nStore();
const givenAmount = ref<number | string>("");
const change = computed(() =>
  Math.max(wholeToFractional(+givenAmount.value) - props.totalCost, 0)
);
const isSubmitting = ref(false);
const store = useStore();

async function onSubmit() {
  isSubmitting.value = true;
  store.commit
    .sync(
      payForOrderAction({
        orderNumber: props.orderNumber,
      })
    )
    .then(() => {
      Notify.create({
        type: "positive",
        position: "top",
        timeout: SUCCESS_TIMEOUT_MS,
        message: t.value.paymentSuccess,
        multiLine: true,
        group: false,
      });
      emit("close");
    })
    .finally(() => {
      isSubmitting.value = false;
    });
}
</script>
