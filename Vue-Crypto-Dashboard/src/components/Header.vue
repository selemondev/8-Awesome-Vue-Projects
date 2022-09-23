<script setup lang="ts">
import { useToggle, useDark } from "@vueuse/core";
import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";
const isDark = useDark();
const toggle = useToggle(isDark);
</script>
<template>
    <div
        class="flex-between px-3 py-2 dark:bg-gray-800 bg-white border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20">
        <div>
            <form>
                <label for="default-search"
                    class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                <div class="relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <input type="search" id="default-search"
                        class="block py-2 px-4 pl-10 w-48 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:w-96"
                        placeholder="Search market" required>
                </div>
            </form>
        </div>

        <div>
            <SunIcon v-if="isDark" @click="toggle()" class="w-6 h-6 dark:text-white cursor-pointer"/>
            <MoonIcon v-else class="w-6 h-6 cursor-pointer" @click="toggle()"/>
        </div>
    </div>
</template>