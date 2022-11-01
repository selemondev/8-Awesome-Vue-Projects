<script setup lang="ts">
import useFormat from "../composables/useFormat";
import usePriceChange from "../composables/usePriceChange";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";
import { ICoin } from "../Types/coins.interface";
import { useFetch, options } from "../utils/coinApi";
const coins = ref<ICoin[]>([]);
const fetchCoins = async () => {
    const url = "https://coinranking1.p.rapidapi.com/coins?limit=50";
    const response = await useFetch(url, options);
    response.data?.coins.forEach((coin: ICoin) => {
        coins.value.push(coin)
    })
}
fetchCoins();
</script>
<template>
    <div class="content w-full h-14 overflow-hidden bg-black relative">
        <ul class="animated-content h-full flex" ref="mq">
            <li v-for="coin in coins" :key="coin.name"
                class="flex-center flex-shrink-0 text-white transform scale-75 lg:scale-100">
                <div class="flex justify-between w-3/4">
                    <div class="flex items-center">
                        <img :src="coin.iconUrl" alt="coin logo"
                            class="w-4 h-4 rounded-full self-start mr-4 object-cover md:mr-2 lg:w-6 lg:h-6" />
                        <div class="hidden lg:block">
                            <p class="font-bold">{{ coin.name }}</p>
                            <p class="text-xs uppercase tracking-widest">
                                {{ coin.symbol }}
                            </p>
                        </div>
                    </div>
                    <div>
                        <p class="font-bold text-xs lg:text-base flex justify-center ">
                            ${{  useFormat(coin.price) }}
                        </p>
                        <p class="font-bold text-xs text-red-400 flex justify-end items-center "
                            v-if="usePriceChange(coin.change)">
                            <ChevronDownIcon class="mr-1 h-4 w-4" />
                            {{ useFormat(coin.change) }}%
                        </p>
                        <p v-else class="font-bold text-xs text-green-400 flex justify-end items-center ">
                            <ChevronUpIcon class="mr-1 h-4 w-4 " />
                            {{ useFormat(coin.change) }}%
                        </p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>