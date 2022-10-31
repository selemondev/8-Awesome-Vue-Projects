<script setup>
const props = defineProps({
    id: {
        type: String
    },
    avatar: {
        type: String
    },
    username: {
        type: String
    }
})
</script>
<template>
    <div :key="props.id" class="flex-between">
        <div class="flex-center space-x-2">
            <img :src="props.avatar" :alt="props.username" class="w-12 h-12 rounded-full">
            <div class="ml-2">
                <h4 class="hover:underline cursor-pointer dark:text-gray-200">{{ props.username }}</h4>
                <p class="text-xs mt-1 dark:text-gray-300">@{{ props.username }}</p>
            </div>
        </div>
        <div>
            <h3 class="text-blue-500 cursor-pointer">Follow</h3>
        </div>
    </div>
</template>