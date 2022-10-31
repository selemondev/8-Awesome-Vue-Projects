import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBRJGxOCLOJ9po2qh0JIO9r3jAvfjfIHNE",
    authDomain: "nuxt-instagram-clone.firebaseapp.com",
    projectId: "nuxt-instagram-clone",
    storageBucket: "nuxt-instagram-clone.appspot.com",
    messagingSenderId: "1084219948983",
    appId: "1:1084219948983:web:8422a0fc3709ee89ee3232"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { 
    auth,
    db,
    storage
}