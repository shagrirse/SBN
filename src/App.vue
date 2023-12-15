<script setup lang="ts">
import { type RouteLocationRaw, RouterView, useRouter } from 'vue-router';

import supabase from '@/lib/supabaseClient';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_IN') {
    authStore.loadUser();
    authStore.loadRedirectRoute();
  } else if (event === 'SIGNED_OUT') {
    authStore.clearUser();
  }
});

authStore.$onAction(({ name, store, after }) => {
  if (name === 'loadRedirectRoute') {
    after(async () => {
      const redirectRoute = store.redirectRoute;

      if (redirectRoute) {
        await router.isReady();
        await router.replace(redirectRoute as RouteLocationRaw);
        authStore.clearRedirectRoute();
      }
    });
  }
});
</script>

<template>
  <div id="app" class="min-h-screen bg-background flex flex-col items-center">
    <router-view></router-view>
  </div>
</template>