<script setup>
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
        icon: "ic:outline-add-circle-outline"
    },
    {
        id: 4,
        icon: "ph:heart"
    }
]
</script>
<template>
    <div>
        <div class="flex-center space-x-2 lg:hidden">
            <Icon name="material-symbols:home-outline-sharp" class="w-7 h-7 cursor-pointer dark:text-gray-300" />
            <Icon name="ph:messenger-logo" class="w-7 h-7 cursor-pointer dark:text-gray-300" />
        </div>
        <div v-for="icon in icons" :key="icon.id" class="hidden lg:inline-block">
            <Icon :name="icon.icon" class="w-7 h-7 cursor-pointer mx-1 dark:text-gray-300" />
        </div>
    </div>
</template>