<script setup lang="ts">
import WidgetCoins from './WidgetCoins.vue';
</script>
<template>
    <div class="hidden lg:inline lg:w-[360px]">
        <div class="grid place-items-center pt-6 pb-2 w-full">
            <h1 class="dark:text-white text-2xl font-bold">Explore Coins</h1>
        </div>

        <div>
            <WidgetCoins/>
        </div>
    </div>
</template>