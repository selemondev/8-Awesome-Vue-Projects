<script setup>
import { Icon } from "@iconify/vue";
import { useAuthStore } from "../stores/authStore";
import { ref, watchEffect } from "vue";
const authStore = useAuthStore();
const token = ref("");
watchEffect(() => {
    token.value = authStore.userToken;
})
const icons = [
    {
        id: 1,
        url: "ph:dots-three-vertical-bold"
    },

    {
        id: 2,
        url: "mdi:facebook-messenger"
    },

    {
        id: 3,
        url: "mdi:bell"
    }
];
</script>
<template>
    <div v-if="token" class="hidden lg:flex lg:justify-center lg:items-center lg:space-x-2">
        <div v-for="icon in icons" :key="icon.id">
            <Icon :icon="icon.url" class="h-6 w-6 text-[#145ceb] cursor-pointer" />
        </div>
    </div>
</template>

