<script setup>
import { useRoute } from "vue-router";
import { useProductStore } from "../stores/productStore";
import { ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import Product_Loader from "../components/Product_Loader.vue";
const route = useRoute();
const params = route.params.id;
const toast = useToast();
const productStore = useProductStore();
const product = ref("");
const loading = ref(false);
const fetchProduct = async () => {
    loading.value = true;
    const response = await axios.get(`https://fakestoreapi.com/products/${params}`);
    loading.value = false;
    product.value = response.data;
};
fetchProduct();

const handleAddToCart = (product) => {
    productStore.addToCart(product);
    toast.success("Product added to cart", {
        timeout: 3000
    })
}
</script>
<template>
    <div>
        <main class="flex justify-center items-center flex-wrap">
            <div v-if="loading">
                <Product_Loader />
            </div>
            <div v-else :key="product.id" class="px-4 border border-gray-200 rounded-sm w-80 m-10">
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
    </div>
</template>