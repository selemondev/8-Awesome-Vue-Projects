<script setup lang="ts">
useHead({
  title: "Nuxt-Reddit",
  link: [{ rel: "icon", type: "svg", href: "https://api.iconify.design/logos:reddit-icon.svg"}]
})
</script>
<template>
  <div>
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
