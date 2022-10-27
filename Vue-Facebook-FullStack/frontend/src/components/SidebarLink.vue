<script setup>
import { Icon } from "@iconify/vue";
const icons = [
    {
        id: 1,
        name: "Home",
        url: "ic:baseline-home"
    },

    {
        id: 2,
        name: "Friends",
        url: "fa-solid:user-friends"
    },

    {
        id: 3,
        name: "Groups",
        url: "material-symbols:groups"
    },

    {
        id: 4,
        name: "Watch",
        url: "mdi:youtube-tv"
    },

    {
        id: 5,
        name: "Pages",
        url: "material-symbols:flag"
    },

    {
        id: 6,
        name: "Market",
        url: "map:grocery-or-supermarket"
    },

    {
        id: 7,
        name: "Games",
        url: "maki:gaming"
    }
]
</script>
<template>
    <div>
        <div v-for="icon in icons"
            class="flex justify-center items-center text-xl space-x-3 animation-hover xl:justify-start">
            <Icon :icon="icon.url" :alt="icon.name" class="h-7 w-7 dark:text-white text-black" />
            <h3 class="hidden lg:inline-block dark:text-white text-black font-bold">{{ icon.name }}</h3>
        </div>

        <div class="grid-layout w-[280px] my-2">
            <button class="py-2 px-4 w-48 bg-[#145CEB] text-white hover:bg-[#0b47c1] dark:bg-[#0D1D2E] dark:hover:bg-[#112942] dark:text-[#145CEB] transition duration-200 ease-in rounded-md">See more</button>
        </div>
    </div>
</template>