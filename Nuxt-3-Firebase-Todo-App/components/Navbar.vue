<script setup lang="ts">
const firebaseUser = useFirebaseUser();
</script>
<template>
    <header>
        <nav class="w-full px-3 flex-between h-14 border-b border-gray-800">
            <div class="flex-center space-x-3">
                <NuxtLink to="/">
                    <h1 class="text-xl md:text-2xl">Nuxt 3</h1>
                </NuxtLink>
                <img src="https://api.iconify.design/logos:nuxt-icon.svg" alt="nuxt">
            </div>

            <div class="flex-center space-x-4">
                <div v-if="!firebaseUser">
                    <a href="https://github.com/selemondev" target="_blank">
                        <img src="https://api.iconify.design/carbon:logo-github.svg" alt="Github"
                            class="bg-white rounded-full h-6 w-6">
                    </a>
                </div>

                <div v-if="firebaseUser">
                    <button @click="signOutUser()" class="py-1 px-3 bg-red-500 hover:bg-red-600 rounded-md transition duration-200 ease-in md:py-2 md:px-4">Sign Out</button>
                </div>
            </div>
        </nav>
    </header>
</template>