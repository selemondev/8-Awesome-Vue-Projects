<script setup>
import Pinia_Logo from "../assets/svg/Pinia.svg";
import { ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
import { ref, computed } from "vue";
import { useProductStore } from "../stores/productStore";
const search = ref("");
const productStore = useProductStore();
const searchProducts = computed(() => {
    if (!search.value || search.value.length < 2) return [];

    return productStore.products.filter((item) => {
        return item.title.toLowerCase().includes(search.value.toLowerCase());
    })
});
</script>
<template>
    <div>
        <header>
            <nav class="w-full h-14 flex-between p-2 bg-[#eee]">
                <div class="flex-center space-x-1">
                    <img :src="Pinia_Logo" alt="Pinia" class="w-10 h-10">
                    <h1 class="font-bold text-base md:text-2xl">
                        <router-link to="/">Store</router-link>
                    </h1>
                </div>


                <div class="hidden md:block">
                    <div class="relative">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <MagnifyingGlassIcon class="w-5 h-5 text-gray-600" />
                        </div>
                        <input type="search" id="default-search" v-model="search" @keyup.enter="handleSubmit"
                            class="block p-3 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg focus:outline-none border border-gray-400"
                            placeholder="Search Products.." required>
                    </div>

                    <div class="relative">
                        <div
                            class="absolute bg-[#eee] left-1 z-10 top-2 w-80 overflow-y-scroll max-h-[50vh] scrollbar-hide">
                            <ul>
                                <li class="p-2 hover:bg-gray-300" v-for="product in searchProducts" :key="product.id">
                                    <span class="cursor-pointer">
                                        <router-link :to="{ name: 'product', params: { id: product.id } }">
                                            {{ product.title }}
                                        </router-link>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    <router-link to="/cart">
                        <div class="w-5.5 h-5.2 rounded-full ml-1 text-center bg-red-500 md:w-6 md:h-6">
                            <span class="text-white text-sm">{{ productStore.cartQuantity }}</span>
                        </div>
                        <ShoppingCartIcon class="w-6 h-6 md:w-8 md:h-8" />
                    </router-link>
                </div>
            </nav>
        </header>
    </div>
</template>