<script setup lang="ts">
import { ref } from 'vue';
function onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;
    const user = { email, password };
    fetch(`${import.meta.env.VITE_FASTIFY}/api/users/sign-in`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify(user),
    })
    .then((response) => response.json())
        .then((data) => {
            // Redirect to the home page
            window.location.href = '/';
    });
}
</script>

<template>
    
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">

        <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        @submit.prevent="onSubmit"
        >
            <label className="text-md" htmlFor="email">
                Email
            </label>
            <input
                className="rounded-md px-4 py-2 bg-inherit border mb-3"
                name="email"
                placeholder="you@example.com"
                required
            />
            <label className="text-md" htmlFor="password">
                Password
            </label>
            <input
                className="rounded-md px-4 py-2 bg-inherit border mb-3"
                type="password"
                name="password"
                placeholder="••••••••"
                required
            />
            <button className="bg-green-700 rounded px-4 py-2 text-white mb-2">
                Sign In
            </button>
            <!-- Create a sign-up button -->
        </form>
    </div>
</template>