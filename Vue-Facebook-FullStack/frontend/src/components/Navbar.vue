<script setup>
import { Icon } from "@iconify/vue";
import ColorModeSwitch from "./ColorModeSwitch.vue";
</script>
<template>
    <div>
        <header>
            <nav class="h-14 w-full border-b border-gray-200 dark:border-gray-800 flex-between p-2">
                <div class="flex items-center space-x-2">
                    <Icon icon="fa6-brands:meta" class="h-10 w-10 text-[#145ceb]"/>
                    <h1 class="text-2xl font-bold text-[#145ceb] hidden dark:text-white md:flex">Meta</h1>
                </div>

                <div class="flex items-center space-x-3">
                    <ColorModeSwitch/>
                    <button class="py-2 px-4 text-sm rounded-md text-white bg-[#145ceb] hover:bg-[#125ef6] md:text-base">Sign In</button>
                </div>
            </nav>
        </header>
    </div>
</template>
