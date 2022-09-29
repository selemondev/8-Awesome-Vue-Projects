<script setup lang="ts">
import millify from "millify";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/solid';
interface Props {
    coinName: string,
    price: string,
    iconUrl: string,
    marketCap: string,
    change: string
}
const props = defineProps<Props>()
const format = (value: number | string | any) => {
    return millify(value)
};

function priceChanged(value: string | number | any) {
    if (value.toString().includes("-")) {
        return value;
    } else {
        return ""
    }
};
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
                    <h1>Price: ${{ format(props.price )}}</h1>
                </div>
        
                <div>
                    <h2>Market Cap: ${{ format(props.marketCap )}}</h2>
                </div>
        
                <div class="flex items-center space-x-2">
                    <span>1Hr: </span>
                    <div v-if="priceChanged(props.change)" class="text-red-500 flex items-center">
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