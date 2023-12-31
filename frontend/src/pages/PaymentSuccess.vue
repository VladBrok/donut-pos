<template>
  <div
    class="q-pa-md bg-gray-lightest min-height-window row justify-center items-center"
  >
    <div class="q-mx-auto max-w-lg text-center">
      <q-icon
        name="task_alt"
        style="font-size: 105px"
        color="positive"
        class="q-mb-sm"
      />
      <h1 class="text-h5 row justify-center">
        {{ t.paymentForOrder }}&nbsp;
        <OrderNumberTitle :is-link="true" :order-number="orderNumber" />
        &nbsp;{{ t.isSuccessfull }}!
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
import OrderNumberTitle from "src/components/OrderNumberTitle.vue";
import { useI18nStore } from "src/lib/i18n";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const orderNumber = computed(() =>
  router.currentRoute.value.params.orderNumber?.toString()
);
const t = useI18nStore();
</script>
