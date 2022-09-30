<script setup lang="ts">
import useFormat from "../composables/useFormat";
import usePriceChange from "../composables/usePriceChange";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/solid';
interface Props {
    coinName: string,
    price: string,
    iconUrl: string,
    marketCap: string,
    change: string
}
const props = defineProps<Props>();
</script>

<template>
    <div>
        <div class="flex-center">
            <div class="px-4 space-y-4 w-64 h-64 bg-[#4B6790]/30 rounded-md">
                <div class="grid-center my-2">
                    <img :src="props.iconUrl" :alt="props.coinName" class="w-20 h-20" />
                </div>
        
                <div>
                    <h1>Name: {{ props.coinName }}</h1>
                </div>
        
                <div>
                    <h1>Price: ${{ useFormat(props.price )}}</h1>
                </div>
        
                <div>
                    <h2>Market Cap: ${{ useFormat(props.marketCap )}}</h2>
                </div>
        
                <div class="flex items-center space-x-2">
                    <span>24Hrs: </span>
                    <div v-if="usePriceChange(props.change)" class="text-red-500 flex items-center">
                        <ChevronDownIcon class="mr-1 h-4 w-4 " />
                        {{ props.change }}%
                    </div>
                    <div v-else class="text-green-500 flex items-center">
                        <ChevronUpIcon class="mr-1 h-4 w-4 " />
                        {{ props.change }}%
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>