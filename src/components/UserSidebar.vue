
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { ref, watchEffect } from 'vue';

const authStore = useAuthStore();
const user: any = ref(null);
const imageInput: any = ref(null);

watchEffect(async () => {
    try {
        user.value = await authStore.getUser;
    } catch (error) {
        console.error('Error fetching user:', error);
    }
});
function uploadFile(event: Event) {
    const imageFile = (event.target as HTMLInputElement)?.files?.[0] as File;
    if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        fetch(`${import.meta.env.VITE_FASTIFY}/api/users/image`, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        })
        .then((response) => response.json())
            .then(() => {
                authStore.loadUser();
                alert('Image uploaded successfully')
        });
    }
}
</script>
<template>
    <div v-if="user">
        <div class="avatar" v-if="!user.image_url">
            <div class="w-24 rounded-full">
                <input src="https://png.pngtree.com/png-vector/20190419/ourmid/pngtree-vector-add-icon-png-image_956621.jpg" type="image" name="avatar" :value="imageInput" width="100" height="100" @click="imageInput?.click()">
                <input type="file" ref="imageInput" style="display: none;" @change="uploadFile"/>
            </div>
        </div>
        <div class="avatar" v-else>
            <div class="w-24 rounded-full cursor-pointer">
                <img :src="user.image_url" @click="imageInput?.click()"/>
                <input type="file" ref="imageInput" style="display: none;" @change="uploadFile"/>
            </div>
        </div>
        <div>
            <h1 class="text-2xl">{{ user.first_name }} {{ user.last_name }}</h1>
        </div>
    </div>
    <div v-else>
        <div class="flex flex-col gap-4 w-52">
            <div class="flex gap-4 items-center">
                <div class="skeleton w-16 h-16 rounded-full shrink-0"></div>
                <div class="flex flex-col gap-4">
                <div class="skeleton h-4 w-20"></div>
                <div class="skeleton h-4 w-28"></div>
                </div>
            </div>
            <div class="skeleton h-32 w-full"></div>
        </div>
    </div>
</template>