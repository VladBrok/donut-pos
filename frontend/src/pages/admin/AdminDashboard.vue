<template>
  <h1>dashboard</h1>
  <q-btn
    outline
    color="negative"
    label="Logout"
    icon="logout"
    @click="logout"
  />
  <pre>
    {{ JSON.stringify(user, undefined, 4) }}
  </pre>
  <div>
    <div>
      {{ count }}
    </div>
    <q-btn color="primary" @click="increment"> Increment </q-btn>
    <q-btn color="primary" @click="decrement"> Decrement </q-btn>
  </div>
</template>

<script setup lang="ts">
import { logoutAction } from "donut-shared";
import { useStore } from "src/store";
import { computed } from "vue";

const store = useStore();
const user = computed(() => store.state.auth.user);
const count = computed(() => store.state.counter.count);

const increment = () => {
  store.commit.sync("counter/increment", { amount: 5 });
};

const decrement = () => {
  store.commit.sync("counter/decrement");
};

const logout = () => {
  store.commit.crossTab(
    logoutAction({ accessToken: store.state.auth.user.accessToken || "" })
  );
};
</script>