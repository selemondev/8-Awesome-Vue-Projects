// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        "@nuxtjs/tailwindcss",
        "@pinia/nuxt"
    ],

    tailwindcss: {
        cssPath: "~/assets/css/main.css"
    }
})
