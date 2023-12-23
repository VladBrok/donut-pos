<template>
  <q-drawer side="right" bordered :width="$q.screen.xs ? 320 : 400">
    <div class="q-pa-sm">
      <div class="row justify-between q-mb-md q-mt-sm">
        <div>
          <slot name="title" />
        </div>
        <div class="flex-grow row justify-end items-start">
          <q-btn dense flat round icon="close" @click="emit('close')" />
        </div>
      </div>
      <div class="q-px-sm">
        <slot name="content" />
      </div>
    </div>
  </q-drawer>
</template>

<script setup lang="ts">
const emit = defineEmits(["close"]);
</script>
