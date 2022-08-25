<script setup>
import Netflix_Header from "../assets/images/Netflix-Header.png";
import Netflix_Avatar from "../assets/images/Netflix-avatar.png";
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/vue/24/solid";
import { useAuthStore } from "../stores/authStore";
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { XMarkIcon } from "@heroicons/vue/24/solid";
const authStore = useAuthStore();
const router = useRouter();
const scrolled = ref(false);
const mobileNav = ref(false);
const rotate = () => {
    return mobileNav.value = !mobileNav.value;
};
const handleScroll = () => {
    if (scrollY > 0) {
        scrolled.value = true;
    } else {
        scrolled.value = false;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
};

watchEffect(() => {
    handleScroll();
})

const handleLogOut = async () => {
    await authStore.logOut();
    router.push("/")
}
</script>
<template>
    <header>
        <nav
            :class="[scrolled ? 'w-full z-10 fixed h-14 bg-black flex-between p-2 lg:p-4' : 'w-full fixed z-10 h-14 bg-transparent flex-between p-2 lg:-4']">
            <div class="flex-center space-x-3">
                <div>
                    <img :src="Netflix_Header" alt="Netflix" class="w-32 h-14">
                </div>

                <div class="hidden lg:block">
                    <ul class="inline-flex space-x-4">
                        <li class="navbarLink">
                            <router-link to="/">Home</router-link>
                        </li>
                        <li class="navbarLink">
                            Tv Shows
                        </li>
                        <li class="navbarLink">Movies</li>
                        <li class="navbarLink">New & Popular</li>
                        <li class="navbarLink">
                            <router-link to="/list">My List</router-link>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="hidden flex-center space-x-3 lg:flex">
                <MagnifyingGlassIcon class="icon-style" />
                <BellIcon class="icon-style" />
                <img @click="handleLogOut()" :src="Netflix_Avatar" alt="Avatar"
                    class="cursor-pointer w-8 h-8 rounded-md">
            </div>

            <div class="flex justify-center items-center space-x-2 lg:hidden">
                <div :class="{ 'rotate': mobileNav }" @click="rotate">
                    <div class="box1"></div>
                    <div class="box2"></div>
                    <div class="box3"></div>
                </div>
            </div>

            <transition name="mobileNav" class="animation">
                <ul v-show="mobileNav" class="sidebar space-y-6 px-4 py-1">
                    <div class="flex-between p-1">
                        <div>
                            <img :src="Netflix_Header" alt="Netflix" class="w-32 h-14" />
                        </div>

                        <div>
                            <XMarkIcon @click="rotate" class="icon-style text-white" />
                        </div>
                    </div>
                    <li class="navbarLink">
                        <router-link to="/">Home</router-link>
                    </li>
                    <li class="navbarLink">
                        Tv Shows
                    </li>
                    <li class="navbarLink">Movies</li>
                    <li class="navbarLink">New & Popular</li>
                    <li class="navbarLink">
                        <router-link to="/list">My List</router-link>
                    </li>
                    <li class="navbarLink">
                        <img @click="handleLogOut()" :src="Netflix_Avatar" alt="Avatar"
                            class="cursor-pointer w-8 h-8 rounded-md">
                    </li>
                </ul>
            </transition>

        </nav>
    </header>
</template>
<style scoped>
.mobileNav-enter-active,
.mobileNav-leave-active {
    transition: 1s ease all;
}

.mobileNav-enter-from,
.mobileNav-leave-to {
    transform: translateX(-250px);
}

.mobileNav-enter-to {
    transform: translateX(0)
}
</style>