<script setup>
import { ref, watchEffect } from "vue";
import { useAuthStore } from "../stores/authStore";
import { Icon } from "@iconify/vue";
const authStore = useAuthStore();
const userProfileImage = ref("");
watchEffect(() => {
    userProfileImage.value = authStore.userImage;
});
</script>
<template>
    <div>
        <div v-if="userProfileImage">
            <img :src="userProfileImage" alt="Profile" class="w-10 h-10 rounded-full">
        </div>
        <div @click="handleClick" v-else class="grid-center h-8 w-8 bg-gray-300 dark:bg-gray-400 rounded-full">
            <Icon icon="carbon:user" class="w-5 h-5"/>
        </div>
    </div>
</template>
