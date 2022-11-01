import { defineStore, acceptHMRUpdate } from "pinia";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { setDoc, Timestamp, updateDoc, doc } from "firebase/firestore";
import { useStorage } from "@vueuse/core";
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    userData: useStorage("user", ""),
    registerLoading: false,
    loginLoading: false,
    registerError: "",
    loginError: "",
  }),

  actions: {
    async registerUser(username, email, password) {
      this.registerLoading = true;
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await setDoc(doc(db, "users", response.user.uid), {
          uid: response.user.uid,
          username,
          email,
          avatar: "",
          avatarPath: "",
          bio: "",
          createdAt: Timestamp.fromDate(new Date()),
          online: true,
        });
        this.userData = response.user.uid;
        this.registerLoading = false;
      } catch (err) {
        this.registerError = err.message;
        this.registerLoading = false;
      }
    },

    async loginUser(email, password) {
      this.loginLoading = true;
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateDoc(doc(db, "users", response.user.uid), {
          online: true,
        });
        this.userData = response.user.uid;
        this.loginLoading = false;
      } catch (err) {
        this.loginError = err.message;
        this.loginLoading = false;
      }
    },
    async logOut() {
      await signOut(auth);
      this.userData = null;
      localStorage.removeItem("user");
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
