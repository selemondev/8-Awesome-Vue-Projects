<script setup>
import { Icon } from "@iconify/vue";
import ColorModeSwitch from "./ColorModeSwitch.vue";
import { useAuthStore } from "../stores/authStore";
import MetaIcons from "./MetaIcons.vue";
import { ref, watchEffect } from "vue";
import { credentials } from "../utils/authUrl";
import axios from "axios";
const token = ref("");
const profileImage = ref("")
const authStore = useAuthStore();
watchEffect(() => {
    token.value = authStore.userToken;
});

const config = {
    headers: {
        Authorization: `Bearer ${token.value}`
    }
};

const getCredentials = async () => {
    const response = await axios.get(credentials, config);
    profileImage.value = response.data.profilePicture;
};
getCredentials();
</script>
<template>
    <div>
        <header>
            <nav
                class="dark:bg-[#0D1D2E] fixed h-14 w-full border-b border-gray-200 dark:border-gray-800 flex-between p-2">
                <div class="flex items-center space-x-2">
                    <router-link to="/">
                        <Icon icon="fa6-brands:meta" class="h-10 w-10 text-[#145ceb]" />
                    </router-link>
                    <h1 class="text-2xl font-bold text-[#145ceb] hidden dark:text-white md:flex">Meta</h1>
                </div>

                <div v-if="token">
                    <input type="text" placeholder="Search Meta" class="navbar-search">
                </div>

                <div class="flex items-center space-x-3">
                    <MetaIcons />
                    <div>
                        <img :src="profileImage" alt="profile image" class="w-10 h-10 rounded-full">
                    </div>
                    <ColorModeSwitch />
                    <div v-if="!token">
                        <router-link to="/">
                            <button
                                class="py-2 px-4 text-sm rounded-md text-white bg-[#145ceb] hover:bg-[#1f6aff] transition duration-200 ease-in md:text-base">
                                Sign In
                            </button>
                        </router-link>
                    </div>
                </div>
            </nav>
        </header>
    </div>
</template>
