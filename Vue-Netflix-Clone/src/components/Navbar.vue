<script setup>
import Netflix_Header from "../assets/images/Netflix-Header.png";
import Netflix_Avatar from "../assets/images/Netflix-avatar.png";
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/vue/24/solid";
import { useAuthStore } from "../stores/authStore";
import { ref } from "vue";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const router = useRouter();
const scrolled = ref(false);
const handleScroll = () => {
    if (scrollY > 0) {
        scrolled.value = true;
    } else {
        scrolled.value = false;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
};

const handleLogOut = async () => {
    await authStore.logOut();
    router.push("/")
}
</script>
<template>
    <header>
        <nav
            :class="[scrolled ? 'w-full h-14 bg-black flex-between p-2 lg:p-4' : 'w-full h-14 bg-transparent flex-between p-2 lg:-4']">
            <div class="flex-center space-x-3">
                <div>
                    <img :src="Netflix_Header" alt="Netflix" class="w-32 h-14">
                </div>

                <div class="hidden xl:block">
                    <ul class="inline-flex space-x-4">
                        <li class="navbarLink"><router-link to="/">Home</router-link></li>
                        <li class="navbarLink">
                            Tv Shows
                        </li>
                        <li class="navbarLink">Movies</li>
                        <li class="navbarLink">New & Popular</li>
                        <li class="navbarLink"><router-link to="/list">My List</router-link></li>
                    </ul>
                </div>
            </div>

            <div class="flex-center space-x-3">
                <MagnifyingGlassIcon class="icon-style" />
                <BellIcon class="icon-style" />
                <img @click="handleLogOut()" :src="Netflix_Avatar" alt="Avatar" class="cursor-pointer w-8 h-8 rounded-md">
            </div>
        </nav>
    </header>
</template>