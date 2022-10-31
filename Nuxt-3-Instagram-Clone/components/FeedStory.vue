<script setup lang="ts">
interface Props {
    userId: string,
    username: string,
    avatar: string,
}
const props = defineProps<Props>();
</script>
<template>
    <div>
        <img :src="props.avatar" :alt="props.username"
            class="w-12 h-12 hover:scale-105 ease-in duration-200 rounded-full object-contain border-2 border-red-500 cursor-pointer">
        <p class="text-center w-12 mt-2 text-xs truncate">{{ props.username }}</p>
    </div>
</template>