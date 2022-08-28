<script setup>
import Logo from "../assets/whatsapp-logo.png";
</script>
<template>
    <div class="grid-center">
        <div class="max-w-sm w-72 mt-6 md:w-80 md:mt-10">
            <form class="bg-white w-full border border-gray-200 shadow-md rounded-md py-4 px-6">
                <div class="grid-center">
                    <img :src="Logo" alt="Logo" class="w-10 h-10">
                </div>

                <div class="pb-3 sm:pb-4">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" placeholder="Username" class="form-input" />
                </div>

                <div class="pb-3 sm:pb-4">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" placeholder="Email" class="form-input" />
                </div>

                <div class="pb-2 sm:pb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" placeholder="Password" class="form-input" />
                </div>

                <div class="pb-2">
                    <p>Don't have an account? <span class="text-green-500 hover:text-green-600 hover:font-bold cursor-pointer"><router-link to="/register">Register</router-link></span></p>
                </div>

                <div>
                    <button type="submit" class="form-btn">Sign In</button>
                </div>
            </form>
        </div>
    </div>
</template>