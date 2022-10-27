import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDhFF63SN0PYLhmt8BsyDV-rW_HGqozbbE",
    authDomain: "vue-facebook-fullstack.firebaseapp.com",
    projectId: "vue-facebook-fullstack",
    storageBucket: "vue-facebook-fullstack.appspot.com",
    messagingSenderId: "898461763312",
    appId: "1:898461763312:web:213c7d9e68dff5df422435"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export {
    db,
    storage
};