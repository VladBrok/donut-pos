<template>
  <div>
    <q-list bordered separator class="rounded-borders">
      <q-item
        clickable
        v-ripple
        v-close-popup
        class="q-px-md q-py-sm"
        @click="emit('click')"
      >
        <q-item-section avatar class="q-mr-xs">
          <q-img :src="imageSrc" alt="" fit="contain" class="image-xs-sm" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-weight-bold text-h6">
            <slot name="text" />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { useI18nStore } from "src/lib/i18n";

defineProps<{
  imageSrc: string;
}>();
const emit = defineEmits(["click"]);

const t = useI18nStore();
</script>
