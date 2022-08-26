<script setup>
import { watchEffect, ref } from 'vue';
import { useProductStore } from '../stores/productStore';
const productStore = useProductStore();
const cartProducts = ref([]);
watchEffect(() => {
  cartProducts.value = productStore.cart;
})
</script>
<template>
  <div class="overflow-y-auto h-96 py-2 px-4">
    <div v-if="productStore.cartQuantity === 0" class="mt-32 grid place-items-center">
      <h2 class="font-bold text-2xl">Your Cart Is Empty</h2>
    </div>
    <div v-else v-for="product in cartProducts" :key="product.id"
      class="max-h-96 py-2 space-y-2 bg-gray-100 border border-gray-200 rounded-md w-full grid place-items-center px-6 my-4 md:px-4 md:h-32 md:flex md:justify-between md:items-center md:space-y-0">
      <div>
        <img :src="product.image" :alt="product.title" class="w-28 h-28 rounded-md">
      </div>

      <div>
        <p class="line-clamp-1">{{ product.title }}</p>
      </div>

      <div>
        <p class="font-bold">Price: ${{ product.price }}</p>
      </div>

      <div>
        <span>Quantity: {{ productStore.itemQuantity(product) }}</span>
      </div>

      <div class="flex items-center space-x-2">
        <button @click="productStore.removeFromCart(product)"
          class="py-1 rounded-md px-2 bg-yellow-500 hover:bg-yellow-600">-</button>
        <p>{{ productStore.itemQuantity(product) }}</p>
        <button @click="productStore.addToCart(product)"
          class="py-1 rounded-md px-2 bg-yellow-500 hover:bg-yellow-600">+</button>
      </div>
    </div>
  </div>
  <div v-if="productStore.cartQuantity > 0" class="mt-10 w-full grid place-items-center bg-white absolute z-5 md:mt-16">
    <p class="font-bold text-2xl">Total: ${{ productStore.productTotal.toFixed(2) }}</p>
  </div>
</template>