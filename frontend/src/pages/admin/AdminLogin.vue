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
        type="tel"
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
        <q-btn
          label="Submit"
          :loading="isLoggingIn"
          type="submit"
          color="primary"
          class="mx-auto"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "src/store";
import { assert, log, loginAction } from "donut-shared";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const phone = ref("+48000000000"); // TODO: remove
const password = ref("1234"); // TODO: remove
const isLoggingIn = ref(false);

const onSubmit = () => {
  isLoggingIn.value = true;
  store.commit
    .sync(
      loginAction.type,
      loginAction({
        phone: phone.value,
        password: password.value,
      })
    )
    .then(() => {
      log(`after login`);
      assert(store.state.auth.user.userId);
      assert(store.state.auth.user.accessToken);
      store.client.changeUser(
        store.state.auth.user.userId || "",
        store.state.auth.user.accessToken || ""
      );
      return store.client.waitFor("synchronized");
    })
    .then(() => {
      return router.push("/admin");
    })
    .finally(() => (isLoggingIn.value = false));
};
</script>
