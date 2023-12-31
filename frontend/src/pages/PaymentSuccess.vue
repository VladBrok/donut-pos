<template>
  <PaymentResult is-success>
    <template #text>
      <span class="row justify-center">
        {{ t.paymentForOrder }}&nbsp;
        <OrderNumberTitle :is-link="true" :order-number="orderNumber" />
        &nbsp;{{ t.isSuccessfull }}!
      </span>
    </template>
  </PaymentResult>
</template>

<script setup lang="ts">
import OrderNumberTitle from "src/components/OrderNumberTitle.vue";
import { useI18nStore } from "src/lib/i18n";
import PaymentResult from "src/pages/PaymentResult.vue";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const orderNumber = computed(() =>
  router.currentRoute.value.params.orderNumber?.toString()
);
const t = useI18nStore();
</script>
