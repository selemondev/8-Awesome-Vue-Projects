<script setup>
import { Icon } from "@iconify/vue";
const icons = [
    {
        id: 1,
        icon: "mingcute:home-4-fill"
    },
    {
        id: 2,
        icon: "ph:messenger-logo"
    },
    {
        id: 3,
        icon: "ph:heart"
    }
]
</script>
<template>
    <div class="flex-center space-x-2">
        <div class="flex-center space-x-2 lg:hidden">
            <Icon icon="material-symbols:home-outline-sharp" class="w-7 h-7 cursor-pointer dark:text-gray-300" />
            <Icon icon="ph:messenger-logo" class="w-7 h-7 cursor-pointer dark:text-gray-300" />
        </div>
        <div v-for="icon in icons" :key="icon.id" class="hidden lg:inline-block">
            <Icon :icon="icon.icon" class="w-7 h-7 cursor-pointer mx-1 dark:text-gray-300" />
        </div>
    </div>
</template>