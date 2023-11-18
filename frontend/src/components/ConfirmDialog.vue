<template>
  <q-dialog>
    <q-card class="q-pa-xs">
      <q-card-section>
        <div class="text-h6">Confirm</div>
      </q-card-section>
      <q-separator inset />

      <q-card-section class="text-body1">
        <slot name="body" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" v-close-popup />
        <slot name="confirmButton" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
