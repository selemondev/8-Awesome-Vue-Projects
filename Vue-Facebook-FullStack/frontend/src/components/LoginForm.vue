<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
    <div class="grid-layout">
        <div
            class="max-w-sm w-72 mt-8 py-2 border border-gray-200 dark:border-none rounded-md sm:w-80 md:border md:border-gray-300 md:dark:border md:dark:border-gray-800 md:py-0 md:mt-20">
            <form class="w-full bg-white dark:bg-[#0e243b] px-6 py-4 rounded-md">
                <div class="grid-layout">
                    <Icon icon="fa6-brands:meta" class="h-10 w-10 text-[#145ceb]" />
                </div>

                <div class="pb-6">
                    <label for="email" class="label">Email</label>
                    <input type="text" placeholder="Email" class="input-style">
                </div>

                <div class="pb-3">
                    <label for="password" class="label">Password</label>
                    <input type="text" placeholder="Password" class="input-style">
                </div>

                <div class="py-2">
                    <p class="cursor-pointer text-sm dark:text-white md:text-base">Don't have an account yet? <span
                            class="text-[#145ceb] font-bold hover:text-[#2f6adf] transition duration-200 ease-in">
                            <router-link to="/register">Register</router-link>
                        </span></p>
                </div>

                <div>
                    <button
                        class="w-full py-2 px-4 bg-[#145ceb] hover:bg-[#1863f8] transition duration-200 ease-in text-white rounded-md">Sign
                        In</button>
                </div>
            </form>
        </div>
    </div>
</template>