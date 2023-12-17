<script setup lang="ts">
import { z } from "zod";
import { usePostsStore } from "@/stores/posts";
const postsStore = usePostsStore();
function submitPost(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const title = form.post_title.value;
    const body = form.post_body.value;
    const post = { title, body };
    try {
        const submitPostSchema = z.object({
            title: z.string().min(1),
            body: z.string().min(1),
        });
        submitPostSchema.parse(post);
    } catch (error) {
        alert('Please fill out all fields and make sure they are valid')
        return;
    }
    fetch(`${import.meta.env.VITE_FASTIFY}/api/posts`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify(post),
    })
    .then((response) => response.json())
        .then(() => {
            postsStore.initializePosts();
            form.reset();
    });
}

</script>

<template>
    <form class="card" @submit.prevent="submitPost">
        <div>
            <h2 class="card-title my-1">Create Post</h2>
            <label class="form-control">
                <input type="text" placeholder="Title" class="input input-bordered mb-4" name="post_title" />
                <textarea class="textarea textarea-bordered h-24" placeholder="What's on your mind?" name="post_body"></textarea>
            </label>
            <div class="card-actions justify-end">
                <button class="btn">Post</button>
            </div>
        </div>
    </form>
</template>