<script setup>
import Logo from "../assets/whatsapp-logo.png";
</script>
<template>
    <div>
        <header>
            <nav class="w-full h-14 flex-between p-2 border-b border-gray-200">
                <div>
                    <img :src="Logo" alt="Logo" class="w-10 h-10">
                </div>

                <div>
                    <button class="navbar-btn">
                        <router-link to="/">Login</router-link>
                    </button>
                </div>
            </nav>
        </header>
    </div>
</template>