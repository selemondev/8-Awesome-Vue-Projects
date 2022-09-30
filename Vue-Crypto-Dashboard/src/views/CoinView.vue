<script setup lang="ts">
import CoinCard from "../components/CoinCard.vue";
import Loader from "../components/Loader.vue";
import { ref } from "vue";
import { useFetch, options } from "../utils/coinApi";
import { ICoin } from "../Types/coins.interface";
const coins = ref<ICoin[]>([]);
const loading = ref(false);
const fetchCoins = async () => {
    const url = "https://coinranking1.p.rapidapi.com/coins?limit=50";
    loading.value = true;
    const response = await useFetch(url, options);
    response.data.coins.forEach((coin: ICoin) => {
        coins.value.push(coin)
    });
    loading.value = false;
};
fetchCoins();
</script>
<template>
    <div class="flex-center flex-wrap md:flex-between">
        <div v-if="loading" class="grid-center w-full mt-48 md:mt-52">
            <Loader />
        </div>

        <div v-else v-for="coin in coins" :key="coin.uuid" class="p-4">
            <CoinCard :coinName="coin.name" :price="coin.price" :iconUrl="coin.iconUrl" :marketCap="coin.marketCap"
                :change="coin.change" :loading="loading" />
        </div>
    </div>
</template>