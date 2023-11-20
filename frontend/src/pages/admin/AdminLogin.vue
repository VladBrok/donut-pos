<template>
  <div class="q-pa-md bg-grey-3 min-height-window">
    <div>
      <div class="q-my-xl text-center text-grey-7">
        <h1 class="text-h3">
          {{ t.loginPageTitle }}
        </h1>
      </div>
      <q-form @submit="onSubmit" class="max-w-sm q-mx-auto">
        <q-card class="q-pa-md">
          <q-card-section class="q-gutter-lg">
            <q-input
              v-model="phone"
              stack-label
              :label="`${t.phoneLabel} *`"
              :hint="`${t.phoneExample}: +48000110022`"
              lazy-rules
              type="tel"
              :rules="[(val) => (val && val.length > 0) || t.phoneRequired]"
            />

            <q-input
              v-model="password"
              stack-label
              :label="`${t.passwordLabel} *`"
              :type="isHidePassword ? 'password' : 'text'"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || t.passwordRequired]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isHidePassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isHidePassword = !isHidePassword"
                />
              </template>
            </q-input>

            <div>
              <q-btn
                :label="t.logIn"
                :loading="isLoggingIn"
                type="submit"
                color="primary"
                class="q-mx-auto d-block"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-form>
    </div>
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
const router = useRouter();

const phone = ref("+48000000000"); // TODO: remove
const password = ref("1234"); // TODO: remove
const isLoggingIn = ref(false);
const isHidePassword = ref(true);

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
