<script setup>
const colorMode = useColorMode();
const changeTheme = () => {
    colorMode.value === 'light' ? colorMode.preference = 'dark' : colorMode.preference = 'light';
};
</script>
<template>
    <div>
        <button @click="changeTheme()" class="py-2 px-3 bg-gray-100 rounded-md dark:bg-gray-800">
            <ColorScheme placeholder="...">
                <Icon name="material-symbols:wb-sunny-outline-rounded" v-if="colorMode.value === 'dark'"
                    class="w-5 h-5 dark:text-white" />
                <Icon name="bi:moon-stars" v-else class="w-5 h-5" />
            </ColorScheme>
        </button>
    </div>
</template>