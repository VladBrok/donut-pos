<template>
  <div class="q-pa-md">
    <div>
      <h1 class="text-h3 text-center">Login to Admin panel</h1>
    </div>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        filled
        v-model="phone"
        label="Phone *"
        hint="Example: +48000110022"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Please enter a phone number',
        ]"
      />

      <q-input
        filled
        v-model="password"
        label="Password *"
        type="password"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please enter a password']"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" class="mx-auto" />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const phone = ref("");
const password = ref("");

const onSubmit = () => {
  console.log("submit");
};
</script>
