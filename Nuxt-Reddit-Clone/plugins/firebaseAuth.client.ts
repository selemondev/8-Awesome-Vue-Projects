import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const firebaseConfig = {
        apiKey: config.public.FIREBASE_API_KEY,
        authDomain: config.public.AUTH_DOMAIN,
        projectId: config.public.PROJECT_ID,
        storageBucket: config.public.STORAGE_BUCKET,
        messagingSenderId: config.public.MESSAGING_SENDER_ID,
        appId: config.public.APP_ID
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    nuxtApp.vueApp.provide('auth', auth);
    nuxtApp.provide('auth', auth);
})