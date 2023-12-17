<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
function logout() {
    const authStore = useAuthStore();
    authStore.clearUser();
    authStore.clearRedirectRoute();
    // Refresh the page to clear the session cookie
    window.location.reload();
}
</script>
<template>
    <div class="navbar bg-base-100">
        <div class="navbar-start">
            <h1 class="font-bold text-3xl" id="logo">SBN Blog</h1>
        </div>
        <div class="navbar-end">
            <a class="btn btn-sm" @click="logout">Log Out</a>
        </div>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
#logo {
    font-family: 'Bebas Neue', sans-serif;
}
</style>