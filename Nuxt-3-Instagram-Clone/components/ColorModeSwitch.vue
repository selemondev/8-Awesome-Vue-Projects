<script setup>
const colorMode = useColorMode();
const changeTheme = (newTheme) => {
    colorMode.preference = newTheme;
};
</script>

<template>
    <button @click="changeTheme($colorMode.preference == 'light' ? 'dark' : 'light')"
        class="py-2 px-2 bg-gray-200 hover:bg-gray-300/40 dark:bg-gray-800 dark:text-white rounded-md">
        <ColorScheme placeholder="...">
            <Icon v-if="$colorMode.value == 'dark'" name="ph:sun" class="w-6 h-6" />
            <Icon v-else name="ph:moon-light" class="w-6 h-6" />
        </ColorScheme>
    </button>
</template>