<script setup lang="ts">
const firebaseUser = useFirebaseUser();
const colorMode = useColorMode();
</script>
<template>
    <header>
        <nav class="w-full h-14 bg-white dark:bg-[#1a1a1a] flex-between px-4">
            <div>
                <div v-if="colorMode.value === 'light'">
                    <Icon name="logos:reddit" class="text-8xl" />
                </div>

                <div v-else>
                    <Icon name="logos:reddit-icon" class="text-4xl" />
                </div>
            </div>

            <div v-if="firebaseUser" class="hidden lg:flex-center lg:space-x-4">
                <div class="flex-center space-x-2 cursor-pointer hover:text-orange-600 hover:font-bold hover:transition hover:duration-200 hover:ease-in dark:hover:text-gray-100 dark:hover:transtion dark:hover:duration-200 dark:hover:ease-in dark:hover:font-bold dark:text-gray-300">
                    <Icon name="ion:home-outline" class="w-5 h-5" />
                    <h4>Home</h4>
                </div>
                <div class="flex-center space-x-2 cursor-pointer hover:text-orange-600 hover:font-bold hover:transition hover:duration-200 hover:ease-in  dark:hover:text-gray-100 dark:hover:transtion dark:hover:duration-200 dark:hover:ease-in dark:hover:font-bold dark:text-gray-300">
                    <Icon name="ic:baseline-star-outline" class="w-5 h-5" />
                    <h4>Popular</h4>
                </div>

                <div class="flex-center space-x-2 cursor-pointer hover:text-orange-600 hover:font-bold hover:transition hover:duration-200 hover:ease-in  dark:hover:text-gray-100 dark:hover:transtion dark:hover:duration-200 dark:hover:ease-in dark:hover:font-bold dark:text-gray-300">
                    <Icon name="ph:newspaper" class="w-5 h-5" />
                    <h4>News</h4>
                </div>

                <div class="flex-center space-x-2 cursor-pointer hover:text-orange-600 hover:font-bold hover:transition hover:duration-200 hover:ease-in dark:hover:text-gray-100 dark:hover:transtion dark:hover:duration-200 dark:hover:ease-in dark:hover:font-bold dark:text-gray-300">
                    <Icon name="ph:gear-light" class="w-5 h-5" />
                    <h4>Settings</h4>
                </div>
            </div>


            <div v-if="firebaseUser">
                <div class="hidden lg:flex lg:relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <Icon name="tabler:search" class="text-gray-400 w-5 h-5" />
                    </div>
                    <input type="search"
                        class="py-2 px-4 pl-10 rounded-md appearance-none bg-gray-200 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        placeholder="Search" required>
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