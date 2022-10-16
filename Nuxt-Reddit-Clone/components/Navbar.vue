<script setup lang="ts">
const firebaseUser = useFirebaseUser();
const colorMode = useColorMode();
</script>
<template>
    <header>
        <nav class="w-full h-14 bg-white dark:bg-[#121212] flex-between px-4">
            <div>
                <div v-if="colorMode.value === 'light'">
                    <Icon name="logos:reddit" class="text-8xl" />
                </div>

                <div v-else>
                    <Icon name="logos:reddit-icon" class="text-4xl" />
                </div>
            </div>

            <div v-if="!firebaseUser">
                <button class="navbar-button">
                    <NuxtLink to="/">
                        Sign In
                    </NuxtLink>
                </button>
            </div>

            <div v-if="firebaseUser">
                <ColorModeSwitch />
            </div>
        </nav>
    </header>
</template>