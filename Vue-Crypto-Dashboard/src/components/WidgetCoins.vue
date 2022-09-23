<script setup lang="ts">
import { useFetch, options } from '../utils/coinApi';
import { ICoin } from "../Types/coins.interface";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/solid';
import { ref } from "vue";
const coins = ref<ICoin[]>([]);
const loading = ref(false);
const fetchAllCoins = async () => {
    loading.value = true;
    const url = "https://coinranking1.p.rapidapi.com/coins?limit=50";
    const response = await useFetch(url, options);
    loading.value = false;
    coins.value = response.data.coins;
    console.log(coins.value)
};
fetchAllCoins();

function priceChanged(value: string) {
    if (value.toString().includes("-")) {
        return value;
    } else {
        return "";
    }
}
</script>
<template>
    <div v-for="coin in coins" :key="coin.uuid" class="px-2 py-2">
        <div class="flex-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition duration-200 ease-in">
            <div class="flex-center space-x-2">
                <div>
                    <img :src="coin.iconUrl" :alt="coin.name" class="w-8 h-8">
                </div>

                <div class="flex-center space-x-2">
                    <p class="dark:text-white">{{ coin.name }}</p>
                    <span class="text-gray-400 text-sm">{{ coin.symbol }}</span>
                </div>
            </div>

            <div>
                <div v-if="priceChanged(coin.change)" class="text-red-500 flex-center font-bold dark:font-normal">
                    <ChevronDownIcon class="mr-1 h-3 w-3" />
                    {{ coin.change }}%
                </div>
                <div v-else class="text-green-500 flex-center font-bold dark:font-normal">
                <ChevronUpIcon class="mr-1 h-3 w-3 "/>
                {{ coin.change }}%
            </div>
            </div>
        </div>
    </div>
</template>