import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const firebaseConfig = {
        apiKey: config.public.FIREBASE_API_KEY,
        authDomain: config.public.FIREBASE_AUTH_DOMAIN,
        projectId: config.public.FIREBASE_PROJECT_ID,
        storageBucket: config.public.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: config.public.FIREBASE_MESSAGING_SENDER_ID,
        appId: config.public.FIREBASE_APP_ID
    };

    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    nuxtApp.vueApp.provide("storage", storage);
    nuxtApp.provide("storage", storage);
})