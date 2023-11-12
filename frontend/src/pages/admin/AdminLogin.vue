<template>
  <div class="q-pa-md">
    <div>
      <h1 class="text-h3 text-center">{{ t.loginPageTitle }}</h1>
    </div>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        filled
        v-model="phone"
        label="Phone *"
        hint="Example: +48000110022"
        lazy-rules
        type="tel"
        :rules="[(val) => (val && val.length > 0) || t.phoneRequired]"
      />

      <q-input
        filled
        v-model="password"
        label="Password *"
        type="password"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || t.passwordRequired]"
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
import { loginAction } from "donut-shared";
import { useStore } from "src/store";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18nStore } from "../../lib/i18n";

const t = useI18nStore();
const store = useStore();
const phone = ref("+48000000000"); // TODO: remove
const password = ref("1234"); // TODO: remove
const isLoggingIn = ref(false);
const router = useRouter();

const onSubmit = async () => {
  isLoggingIn.value = true;
  store.commit
    .sync(
      loginAction({
        phone: phone.value,
        password: password.value,
      })
    )
    .then(() => {
      store.client.changeUser(
        store.state.auth.user.userId || "",
        store.state.auth.user.accessToken || ""
      );
      router.push("/admin");
    })
    .finally(() => {
      isLoggingIn.value = false;
    });
};
</script>
