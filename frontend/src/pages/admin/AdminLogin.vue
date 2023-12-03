<template>
  <div class="q-pa-md bg-gray-lightest min-height-window">
    <div>
      <div class="q-my-xl text-center text-dark-ligher">
        <h1 class="text-h3">
          {{ t.loginPageTitle }}
        </h1>
      </div>
      <q-form @submit="onSubmit" class="max-w-sm q-mx-auto">
        <q-card class="q-pa-md">
          <q-card-section class="q-gutter-lg">
            <phone-input v-model.trim="phone" :shouldValidateFormat="false">
            </phone-input>
            <password-input
              v-model="password"
              :should-validate-format="false"
              required
            >
            </password-input>
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
import { loginAction } from "donut-shared/src/actions/auth";
import { useStore } from "src/store";
import { ref } from "vue";
import { useRouter } from "vue-router";
import PasswordInput from "../../components/PasswordInput.vue";
import PhoneInput from "../../components/PhoneInput.vue";
import { useI18nStore } from "../../lib/i18n";

const t = useI18nStore();
const store = useStore();
const router = useRouter();

const phone = ref("+48000000000"); // TODO: remove
const password = ref("1234"); // TODO: remove
const isLoggingIn = ref(false);

const onSubmit = async () => {
  isLoggingIn.value = true;
  store.commit
    .sync(
      loginAction({
        phone: phone.value,
        password: password.value,
        permissions: {
          admin: true,
        },
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
