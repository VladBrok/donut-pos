<template>
  <div class="bg-gray-lightest min-height-window column justify-between">
    <div class="q-pa-md q-mb-xl">
      <div class="q-mx-auto max-w-md">
        <div class="demo-logo-image q-mx-auto q-pt-md q-pb-lg">
          <logo-image />
        </div>
        <h1 class="text-h4 text-center">{{ t.demoTitle }}</h1>
        <q-card class="q-pa-md">
          <q-card-section>
            <ClickableCardItem
              image-src="/images/demo/admin.svg"
              @click="router.push('/admin')"
            >
              <template #text>
                {{ t.adminPanel }}
              </template>
            </ClickableCardItem>
          </q-card-section>
          <q-card-section>
            <ClickableCardItem
              image-src="/images/demo/waiter.svg"
              @click="router.push('/waiter')"
            >
              <template #text>
                {{ t.waiterApp }}
              </template>
            </ClickableCardItem>
          </q-card-section>
          <q-card-section>
            <ClickableCardItem
              image-src="/images/demo/client.svg"
              @click="router.push('/')"
            >
              <template #text>
                {{ t.clientApp }}
              </template>
            </ClickableCardItem>
          </q-card-section>
          <q-card-section>
            <ClickableCardItem
              image-src="/images/demo/courier.svg"
              @click="router.push('/courier')"
            >
              <template #text>
                {{ t.courierApp }}
              </template>
            </ClickableCardItem>
          </q-card-section>
          <q-card-section>
            <ClickableCardItem
              image-src="/images/demo/kitchen.svg"
              @click="router.push('/kitchen')"
            >
              <template #text>
                {{ t.kitchenDisplay }}
              </template>
            </ClickableCardItem>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ClickableCardItem from "src/components/ClickableCardItem.vue";
import LogoImage from "src/components/LogoImage.vue";
import { useI18nStore } from "src/lib/i18n";
import { useRouter } from "vue-router";

const router = useRouter();
const t = useI18nStore();
</script>
