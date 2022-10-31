<script setup>
import { useDark, useToggle } from '@vueuse/core'
import { Icon } from "@iconify/vue";
const isDark = useDark()
const toggleDark = useToggle(isDark);
</script>

<template>
    <button @click="toggleDark()"
        class="py-2 px-2 bg-gray-200 hover:bg-gray-300/40 dark:bg-gray-800 dark:text-white rounded-md">
            <Icon v-if="isDark" icon="ph:sun" class="w-6 h-6" />
            <Icon v-else icon="ph:moon-light" class="w-6 h-6" />
    </button>
</template>