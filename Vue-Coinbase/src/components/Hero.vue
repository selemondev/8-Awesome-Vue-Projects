<script setup lang="ts">
import Hero_Bg from "../assets/image/hero-bg.png"
</script>

<template>
    <div class="w-full px-14 space-y-6 flex flex-col items-center justify-between mt-8 md:mt-16 md:space-y-0 md:flex-row">
        <div class="max-w-md md:w-1/2">
            <h2
                class="text-white text-2xl text-center font-bold leading-12 md:leading-[60px] md:font-extrabold md:text-left md:text-5xl md:max-w-lg">
                The Easiest Way To Track Multiple Currencies</h2>
            <div class="max-w-md mt-2">
                <p class="text-gray-400 text-sm text-center md:text-base md:text-left">Market Watchman allows you to
                    monitor
                    your balances, to trade without limits and to earn rewards for specific coins</p>
            </div>
            <div class="flex flex-col justify-center space-x-0  md:flex-row md:space-x-4 md:justify-start">
                <a href="#table" v-smooth-scroll="{  duration: 400 }">
                <button
                    class="mt-6 text-white px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 outline-none rounded-md w-full md:text-base md:py-2.5 md:px-6">Get Started</button></a>
                <button
                    class="mt-6 text-white px-3 py-2 text-sm border border-blue-800 hover:bg-blue-600 transition duration-200 ease-in outline-none rounded-md md:text-base md:py-2.5 md:px-6">
                    <router-link to="/coinView">View All Coins</router-link>
                </button>
            </div>
        </div>

        <div class="max-w-sm md:w-1/2">
            <img :src="Hero_Bg" alt="Hero-bg" class="text-center -ml-2 w-64 h-64 md:h-full md:w-full">
        </div>
    </div>
</template>