import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDneo6YRuBq4diuhs12EOqKbXJB2Oi6GWM",
  authDomain: "vue-whatsapp-clone-73d03.firebaseapp.com",
  projectId: "vue-whatsapp-clone-73d03",
  storageBucket: "vue-whatsapp-clone-73d03.appspot.com",
  messagingSenderId: "481853368573",
  appId: "1:481853368573:web:cddd87d0618ea373eaf694"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
    auth,
    db,
    storage
}