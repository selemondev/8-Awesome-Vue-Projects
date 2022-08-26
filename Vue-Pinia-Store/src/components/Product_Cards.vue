<script setup>
import { useProductStore } from '../stores/productStore';
import { ref, watchEffect } from "vue";
import Loader from "./Loader.vue";
import { useToast } from "vue-toastification";
const toast = useToast();
const productStore = useProductStore();
const products = ref([]);
const loading = ref(null);
watchEffect(() => {
    productStore.fetchProducts();
});

watchEffect(() => {
    loading.value = productStore.loading;
    products.value = productStore.products;
});

const handleAddToCart = (product) => {
    productStore.addToCart(product);
    toast.success("Product added to cart successfully", {
        timeout: 3000
    });
}
</script>
<template>
    <main class="flex-center flex-wrap">
        <div v-if="loading">
            <Loader />
        </div>
        <div v-else v-for="product in products" :key="product.id"
            class="px-4 border border-gray-200 rounded-sm w-80 m-10">
            <div class="grid-center">
                <img :src="product.image" :alt="product.title" class="w-48 h-48 md:w-64 md:h-64">
            </div>

            <div class="space-y-4">
                <div class="pt-2">
                    <h1 class="font-bold line-clamp-1">{{ product.title }}</h1>
                </div>
                <div>
                    <h4 class="font-bold">Price: ${{ product.price }}</h4>
                </div>

                <div>
                    <button @click="handleAddToCart(product)"
                        class="bg-black hover:bg-white hover:text-black mb-2 transition duration-200 ease-in border border-black text-white py-1.5 px-2 rounded-md">Add
                        To Cart</button>
                </div>
            </div>
        </div>
    </main>
</template>