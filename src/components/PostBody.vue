<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps(['body'])
const maxCount = 200;
const body = props.body.length > maxCount ? props.body.slice(0, maxCount) + '...' : props.body;
const expanded = ref(false);
</script>

<template>
    <div v-if="body.length > maxCount">
        <p class="text-gray-500" v-if="!expanded">{{ body }} <span v-if="body.length > maxCount" class="text-xs text-primary cursor-pointer" @click="expanded=true">Read More</span></p>
        <p class="text-gray-500" v-else>{{ props.body }} <span v-if="body.length > maxCount" class="text-xs text-primary cursor-pointer" @click="expanded=false">Read Less</span></p>
    </div>
    <p class="text-gray-500" v-else>{{ body }} <span v-if="body.length > maxCount" class="text-xs text-primary cursor-pointer">Read More</span></p>
</template>