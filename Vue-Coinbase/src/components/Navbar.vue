<script setup lang="ts">
import Logo from "../assets/image/coinbase.png";
import NavbarTop from "./Navbar-Top.vue";
import { ref } from "vue";
const mobileNav = ref(false);
const rotate = () => {
    return mobileNav.value = !mobileNav.value;
};
</script>

<template>
    <div>
        <header>
            <NavbarTop/>
            <nav class="flex-between p-4">
                <div>
                    <h1 class="text-xl md:text-2xl">Coinbase</h1>
                </div>

                <div class="hidden lg:block">
                    <ul class="inline-flex space-x-4">
                        <li class="navbar-li-tag"><router-link to="/">Home</router-link></li>
                        <li class="navbar-li-tag">
                            <router-link to="/coinView">
                                Coins
                            </router-link>
                        </li>
                        <li class="navbar-li-tag">
                            <router-link to="/newsView">
                                News
                            </router-link>
                        </li>
                    </ul>
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
                        <div class="flex-between p-2">
                            <div class="flex items-center space-x-1">
                                <img :src="Logo" alt="Logo" class="w-8 h-8">
                                <h1 class="navbar-title">
                                    <router-link to="/">Coinbase</router-link>
                                </h1>
                            </div>
                        </div>
                        <li class="mobile-li-tags">
                            <a href="#">Home</a>
                        </li>
                        <li class="mobile-li-tags">
                            <a href="#">
                                <router-link to="/coinView">
                                    Coins
                                </router-link>
                            </a>
                        </li>

                        <li class="mobile-li-tags">
                            <a href="#">
                                <router-link to="/newsView">
                                    News
                                </router-link>
                            </a>
                        </li>
                    </ul>
                </transition>
            </nav>
        </header>
    </div>
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