<template>
  <div class="q-pa-md bg-gray-lightest min-height-window">
    <div>
      <div class="q-my-xl text-center text-dark-ligher">
        <div>
          <!-- <q-icon :name="iconName" style="font-size: 55px" /> -->
        </div>
        <h1 class="text-h3">
          {{ t.signUp }}
        </h1>
        <p v-if="text" class="text-h6">
          {{ text }}
        </p>
      </div>
      <q-form
        @submit="onSubmit"
        class="max-w-sm q-mx-auto"
        @validation-error="onFormValidationError"
      >
        <q-card class="q-pa-md">
          <q-card-section class="q-gutter-lg">
            <q-input
              v-model.trim="firstName"
              stack-label
              :label="`${t.firstName} *`"
              lazy-rules
              type="text"
              :rules="[
                (val) => (!!val && val.length > 0) || t.fieldRequired,
                (val) =>
                  val.length <= FIRST_NAME_MAX_LENGTH ||
                  t.maxLength({ max: FIRST_NAME_MAX_LENGTH }),
              ]"
            />
            <q-input
              v-model.trim="lastName"
              stack-label
              :label="`${t.lastName} *`"
              lazy-rules
              type="text"
              :rules="[
                (val) => (!!val && val.length > 0) || t.fieldRequired,
                (val) =>
                  val.length <= LAST_NAME_MAX_LENGTH ||
                  t.maxLength({ max: LAST_NAME_MAX_LENGTH }),
              ]"
            />
            <email-input v-model="email" />
            <password-input
              v-model="password"
              :should-validate-format="true"
              required
            >
            </password-input>
            <div class="q-mt-xl">
              <q-btn
                :label="t.signUp"
                :loading="isSigningUp"
                type="submit"
                color="primary"
                class="q-mx-auto d-block"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-form>
    </div>
    <div class="text-center text-h6 q-mt-xl text-weight-regular">
      <p>{{ t.alreadyHaveAccount }}</p>
      <router-link class="link" :to="'/login'"> {{ t.logIn }}</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FIRST_NAME_MAX_LENGTH, LAST_NAME_MAX_LENGTH } from "donut-shared";
import { signUpAction } from "donut-shared/src/actions/auth";
import EmailInput from "src/components/EmailInput.vue";
import PasswordInput from "src/components/PasswordInput.vue";
import { createOrderAfterAuth } from "src/lib/create-order";
import { onFormValidationError } from "src/lib/on-form-validation-error";
import { computed, ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useI18nStore } from "../../lib/i18n";
import { useStore } from "../../store";

const store = useStore();
const isSigningUp = ref(false);
const t = useI18nStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const route = useRoute();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const text = computed(() => t.value[route.query?.text?.toString()] || "");

const onSubmit = async () => {
  isSigningUp.value = true;
  store.commit
    .sync(
      signUpAction({
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
      })
    )
    .then(() => {
      store.client.changeUser(
        store.state.auth.user.userId || "",
        store.state.auth.user.accessToken || ""
      );

      if (store.state.orders.createOrderAfterAuth) {
        return createOrderAfterAuth(store, t, router);
      }

      return router.push("/");
    })
    .finally(() => {
      isSigningUp.value = false;
    });
};
</script>
