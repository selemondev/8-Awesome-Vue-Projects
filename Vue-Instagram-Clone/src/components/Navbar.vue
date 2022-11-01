<script setup>
import { useAuthStore } from "../stores/authStore";
import NavbarIcons from "./NavbarIcons.vue";
import ColorModeSwitch from "./ColorModeSwitch.vue";
import ProfileImageComponent from "./ProfileImageComponent.vue";
import { Icon } from '@iconify/vue';
import { ref, watchEffect } from "vue";
const authStore = useAuthStore();
const token = ref("");
watchEffect(() => {
    token.value = authStore?.userToken;
});
</script>
<template>
    <div>
        <header>
            <nav class="flex-between fixed top-0 z-20 h-[66px] w-full border-b border-gray-200 bg-white dark:bg-gray-900 dark:border dark:border-gray-800 px-4 lg:h-[68px] ">
                <div>
                    <router-link to="/">
                        <Icon icon="simple-icons:instagram" class="text-3xl dark:text-gray-200" />
                    </router-link>
                </div>

                <div v-if="token" class="hidden lg:block">
                    <input type="text" placeholder="Search" class="navbar-search">
                </div>
                <div class="flex-center space-x-3">
                    <NavbarIcons v-if="token"/>
                    <ProfileImageComponent v-if="token"/>
                    <ColorModeSwitch />
                    <button v-if="!token" class="navbar-btn">Sign In</button>
                </div>
            </nav>
        </header>
    </div>
</template>