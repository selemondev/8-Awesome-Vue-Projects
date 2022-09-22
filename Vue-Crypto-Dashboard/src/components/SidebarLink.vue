<script setup lang="ts">
import { HomeIcon } from "@heroicons/vue/24/solid";
import { NewspaperIcon } from "@heroicons/vue/24/outline";
import Coin from "./Icon/Coin.vue"
const sidebarLinks = [
    {
        label: "Home", Icon: HomeIcon
    },
    {
        label: "Coins", Icon: Coin
    },

    {
        label: "News", Icon: NewspaperIcon
    }
]
</script>

<template>
    <div v-for="link in sidebarLinks" class="flex-center space-x-3 text-xl animation-hover xl:justify-start">
        <component :is="link.Icon" class="w-7 h-7 text-black dark:text-white"/>
        <h3 class="hidden font-bold text-black dark:text-white xl:inline-block">{{ link.label }}</h3>
    </div>
</template>