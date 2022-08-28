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

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);
export {
    storage,
    db,
    auth
}