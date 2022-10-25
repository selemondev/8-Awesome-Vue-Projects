<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
    <div class="grid-layout">
        <div
            class="max-w-sm w-72 mt-4 py-2 border border-gray-200 dark:border-none rounded-md sm:w-80 md:border md:border-gray-300 md:dark:border md:dark:border-gray-800 md:py-0 md:mt-6">
            <form class="w-full bg-white dark:bg-[#0e243b] px-6 py-4 rounded-md">
                <div class="grid-layout">
                    <Icon icon="fa6-brands:meta" class="h-10 w-10 text-[#145ceb]" />
                </div>

                <div class="pb-6">
                    <label for="username" class="label">Username</label>
                    <input type="text" placeholder="Username" class="input-style">
                </div>

                <div class="pb-6">
                    <label for="email" class="label">Email</label>
                    <input type="email" placeholder="Email" class="input-style">
                </div>

                <div class="pb-6">
                    <label for="password" class="label">Password</label>
                    <input type="password" placeholder="Password" class="input-style">
                </div>

                <div class="pb-6">
                    <label for="confirmPassword" class="label">ConfirmPassword</label>
                    <input type="password" placeholder="ConfirmPassword" class="input-style">
                </div>


                <div>
                    <button
                        class="w-full py-2 px-4 bg-[#145ceb] hover:bg-[#1863f8] transition duration-200 ease-in text-white rounded-md">Sign
                        Up</button>
                </div>
            </form>
        </div>
    </div>
</template>