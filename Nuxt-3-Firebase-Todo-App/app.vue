<script setup lang="ts">
useHead({
  title: "Nuxt 3 x Firebase",
  link: [{ rel: 'icon', type: 'svg', href: 'https://api.iconify.design/logos:nuxt-icon.svg' }],
});
const loadingState = useLoadingState();
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage v-if="!loadingState"/>
    </NuxtLayout>

    <div class="grid-layout mt-40 md:mt-48" v-if="loadingState">
      <Loader/>
    </div>
  </div>
</template>