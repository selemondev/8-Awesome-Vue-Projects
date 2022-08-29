<script setup>
import Navbar from './components/Navbar.vue';
import { useAuthStore } from './store/authStore';
import { ref, watchEffect } from "vue";
const authStore = useAuthStore();
const token = ref("");
watchEffect(() => {
  token.value = authStore.userData;
})
</script>
<template>
  <div>
    <Navbar v-if="!token"/>
    <router-view/>
  </div>
</template>