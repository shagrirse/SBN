<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePostsStore } from '@/stores/posts';
import PostBody from './PostBody.vue';
const postsStore = usePostsStore();

// Loading state to indicate when posts are being fetched
const isLoading = ref(true);
const postResponse = postsStore.initializePosts().finally(() => {
    isLoading.value = false;
})
console.log(postResponse);

const { posts } = storeToRefs(postsStore);

// Add pagination logic
const currentPage = ref(0);
const pageSize = 5;

const paginatedPosts = computed(() => {
    const startIndex = currentPage.value * pageSize;
    const endIndex = startIndex + pageSize;
    return posts.value.slice(startIndex, endIndex);
});

function previousPage() {
    if (currentPage.value > 0) {
        currentPage.value--;
    }
}

function nextPage() {
    const maxPages = Math.ceil(posts.value.length / pageSize);
    if (currentPage.value < maxPages - 1) {
        currentPage.value++;
    }
}
</script>
<template>
    <div>
        <h1 class="text-3xl">Recent Posts</h1>
        <!-- Display skeleton or paginated posts based on loading state -->
        <div class="flex flex-col items-center">
            <div v-if="isLoading" class="skeleton min-w-full h-96"></div>
            <div v-else class="self-start">
                <div v-for="post in paginatedPosts" :key="post.id">
                    <div class="py-4">
                        <div class="text-xs cursor-default">
                            <div class="tooltip tooltip-right" :data-tip="post.created_at">
                                By <span class="font-bold">{{ post.user.first_name }} {{ post.user.last_name }}</span>
                            </div>
                        </div>
                        <h2 class="card-title">{{ post.title }}</h2>
                        <PostBody :body="post.body" />
                    </div>
                </div>
                
            </div>
            <!-- Display pagination controls -->
            <div className="join grid grid-cols-12 w-1/3">
                <button className="join-item btn btn-outline col-span-5" @click="previousPage">Previous page</button>
                <button className="join-item col-span-2 border">{{ currentPage + 1 }}</button>
                <button className="join-item btn btn-outline col-span-5" @click="nextPage">Next</button>
            </div>
        </div>
    </div>
</template>
