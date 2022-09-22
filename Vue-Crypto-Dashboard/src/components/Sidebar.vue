<script setup lang="ts">
import Coinbase from "../assets/image/coinbase.png";
import SidebarLink from "./SidebarLink.vue";
</script>

<template>
    <div class="hidden border border-gray-200 fixed h-full flex-col items-center sm:flex xl:w-[250px] xl:items-start">
        <div class="flex-center space-x-4 p-0 w-40 h-14 xl:ml-6">
            <img :src="Coinbase" alt="Coinbase" class="w-10 h-10">
            <h1 class="text-black dark:text-white font-bold text-xl">Coinbase</h1>
        </div>

        <div class="mb:2.5 mt-4 space-y-2 xl:ml-6">
            <SidebarLink/>
        </div>
    </div>
</template>