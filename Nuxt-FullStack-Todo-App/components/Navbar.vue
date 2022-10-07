<script setup lang="ts">
</script>
<template>
    <header>
        <nav class="w-full px-3 flex-between h-14 border-b border-gray-800">
            <div class="flex-center space-x-2">
                <NuxtLink to="/">
                    <h1 class="text-xl md:text-2xl">Nuxt 3</h1>
                </NuxtLink>
                <Icon name="logos:mongodb-icon" class="text-2xl"/>
            </div>

            <div>
                <div>
                    <a href="https://github.com/selemondev" target="_blank">
                        <img src="https://api.iconify.design/carbon:logo-github.svg" alt="Github"
                            class="bg-white rounded-full h-6 w-6">
                    </a>
                </div>
            </div>
        </nav>
    </header>
</template>