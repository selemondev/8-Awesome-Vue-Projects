// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-icon"],
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI
  },

  // register nitro plugin
  nitro: {
    plugins: ["@/server/db/index.ts"]
  },
  css: ["@/assets/main.css"],

  // transpile packages
  build: {
    transpile: ["vue-toastification"]
  }
});
