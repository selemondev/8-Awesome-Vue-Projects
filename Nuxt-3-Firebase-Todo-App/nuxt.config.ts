// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        "@nuxtjs/tailwindcss"
    ],
    runtimeConfig: {
        FIREBASE_API_KEY: "AIzaSyA2EoYFdCCTCQ7FXyF9VX-DjdFpQ8h5GzU",
        FIREBASE_AUTH_DOMAIN: "nuxt-firebase-b75fb.firebaseapp.com",
        FIREBASE_PROJECT_ID: "nuxt-firebase-b75fb",
        FIREBASE_STORAGE_BUCKET: "nuxt-firebase-b75fb.appspot.com",
        FIREBASE_MESSAGING_SENDER_ID: "218542199251",
        FIREBASE_APP_ID: "1:218542199251:web:377bedd62925789a5b9f26",
        public: {
            FIREBASE_API_KEY: "AIzaSyA2EoYFdCCTCQ7FXyF9VX-DjdFpQ8h5GzU",
            FIREBASE_AUTH_DOMAIN: "nuxt-firebase-b75fb.firebaseapp.com",
            FIREBASE_PROJECT_ID: "nuxt-firebase-b75fb",
            FIREBASE_STORAGE_BUCKET: "nuxt-firebase-b75fb.appspot.com",
            FIREBASE_MESSAGING_SENDER_ID: "218542199251",
            FIREBASE_APP_ID: "1:218542199251:web:377bedd62925789a5b9f26",
        }
    },

    css: [
        "@/assets/css/main.css"
    ]
})
