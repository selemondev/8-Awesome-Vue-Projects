<script setup>
import { Icon } from "@iconify/vue";
</script>
<template>
    <div>
        <header>
            <nav class="h-14 w-full border border-b border-gray-200 flex-between p-2">
                <div class="flex items-center space-x-2">
                    <Icon icon="fa6-brands:meta" class="h-10 w-10 text-[#145ceb]"/>
                    <h1 class="text-2xl font-bold text-[#145ceb] hidden md:flex">Meta</h1>
                </div>

                <div class="flex items-center space-x-3">
                    <button class="py-1.5 px-2 border border-gray-200 bg-gray-100 hover:bg-gray-200 transition duration-200 ease-in rounded-md md:py-2">
                        <Icon icon="ph:sun" class="h-6 w-6" />
                    </button>
                    <button class="py-2 px-4 text-sm rounded-md text-white bg-[#145ceb] hover:bg-[#125ef6] md:text-base">Sign In</button>
                </div>
            </nav>
        </header>
    </div>
</template>
