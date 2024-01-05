<template>
  <login-page
    :is-logging-in="isLoggingIn"
    @submit="onSubmit"
    icon-name="o_restaurant_menu"
  >
    <template v-slot:title>
      {{ t.clientLoginPageTitle }}
    </template>
    <template v-slot:bottom>
      <div class="text-center text-h6 q-mt-xl text-weight-regular">
        <p>{{ t.dontHaveAccount }}</p>
        <router-link class="link" :to="'/sign-up'"> {{ t.signUp }}</router-link>
      </div>
    </template>
  </login-page>
</template>

<script setup lang="ts">
import { loginAction } from "donut-shared/src/actions/auth";
import { createOrderAfterAuth } from "src/lib/create-order";
import { ref } from "vue";
import { useRouter } from "vue-router";
import LoginPage from "../../components/LoginPage.vue";
import { useI18nStore } from "../../lib/i18n";
import { useStore } from "../../store";

const t = useI18nStore();
const store = useStore();
const router = useRouter();
const isLoggingIn = ref(false);

const onSubmit = async (data: { password: string; email: string }) => {
  isLoggingIn.value = true;
  store.commit
    .sync(
      loginAction({
        email: data.email,
        password: data.password,
        permissions: {
          client: true,
        },
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
      isLoggingIn.value = false;
    });
};
</script>
