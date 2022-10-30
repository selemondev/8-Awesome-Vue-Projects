<script setup>
const colorMode = useColorMode();
console.log(colorMode.value)
const handleClick = () => colorMode.value === "light" ? (colorMode.preference === "dark") : (colorMode.preference === "light");
</script>

<template>
    <button @click="handleClick" class="py-2 px-2 bg-gray-200 hover:bg-gray-300/40 rounded-md">
        <ColorScheme placeholder="...">
            <Icon v-if="colorMode.value === 'dark'" name="ph:sun" class="w-6 h-6"/>
            <Icon v-else name="ph:moon-light" class="w-6 h-6"/>
        </ColorScheme>
    </button>
</template>