<script setup>
import { useAuthStore } from '../stores/authStore';
import { ref, watchEffect } from "vue";
import SidebarLink from './SidebarLink.vue';
const token = ref("");
const authStore = useAuthStore();
watchEffect(() => {
    token.value = authStore.userToken;
});

const config = {
    headers: {
        Authorization: `Bearer ${token.value}`
    }
};


</script>

<template>
    <div class="hidden items-center flex-col fixed top-20 left-6 h-[490px] rounded-md bg-gray-100 dark:bg-[#193a5e] xl:flex xl:items-start xl:w-[300px]">
        <div class="mb:2.5 mt-2 space-y-2 xl:ml-4">
            <SidebarLink />
        </div>
    </div>
</template>