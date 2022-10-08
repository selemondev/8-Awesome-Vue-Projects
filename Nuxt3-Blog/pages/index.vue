<script setup lang="ts">
useHead({
  title: "Nuxt 3 x Blog",
  link: [
    {
      rel: "icon",
      type: "svg",
      href: "https://api.iconify.design/logos:nuxt-icon.svg",
    },
  ],
});

const { data } = await useAsyncData("article", () => queryContent("blog").find());
</script>
<template>
  <div>
    <div class="text-center my-6">
      <h1 class="text-4xl text-gray-400">Latest Article</h1>
    </div>

    <div class="m-6">
      <ul class="flex justify-center items-center flex-wrap">
        <li v-for="article in data" :key="article._path">
          <NuxtLink :to="article._path">
            <div>
              <div
                class="bg-gray-900 rounded-md w-72 h-[470px] items-center md:h-[490px] md:w-[370px]">
                <div class="px-2 space-y-2">
                  <div class="grid-layout mt-2">
                    <img :src="`${article.image}`" :alt="article.title" class="w-full h-64">
                  </div>

                  <div class="text-center">
                    <h2 class="font-bold text-lg text-white hover:underline md:text-xl">{{article.title}}</h2>
                  </div>
                  <div class="line-clamp-5">
                    <p class="text-sm text-gray-200 line-clamp-3 md:text-lg">{{ article.description }}</p>
                  </div>

                  <div>
                    <span class="text-gray-400 text-sm">Published On: {{ article.publishedAt }}</span>
                  </div>

                  <div>
                    <button class="py-2 px-4 mt-2 bg-gray-700/50 rounded-md">
                      <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-sky-400 to-purple-600 background-animate">Read
                        More</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
