<script setup>
import { Icon } from "@iconify/vue";
import { useDark, useToggle } from "@vueuse/core";
const isDark = useDark();
const handleToggle = useToggle(isDark);
</script>
<template>
    <div>
        <button @click="handleToggle()"
            class="py-1.5 px-2 border border-gray-200 dark:border dark:border-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-800 transition duration-200 ease-in rounded-md">
            <Icon v-if="isDark" icon="ph:sun" class="h-6 w-6 dark:text-white" />
            <Icon v-else icon="ph:moon" class="h-6 w-6 dark:text-white" />
        </button>
    </div>
</template>