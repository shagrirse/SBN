<script setup lang="ts">
import CreatePost from './CreatePost.vue';
import ViewPosts from './ViewPosts.vue';
import UserSidebar from './UserSidebar.vue';
</script>

<template>
    <div class="px-32">
        <div className="grid grid-cols-12">
            <ViewPosts class="col-span-8"/>
            <div className="divider lg:divider-horizontal"></div>
            <div className="col-span-3">
                <UserSidebar/>
                <CreatePost/>
            </div>
        </div>
    </div>
</template>
