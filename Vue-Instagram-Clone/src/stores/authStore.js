import { defineStore, acceptHMRUpdate } from "pinia";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, doc, Timestamp, updateDoc } from "firebase/firestore";
export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
        userToken: JSON.parse(localStorage.getItem("token")),
        userImage: JSON.parse(localStorage.getItem("profile")),
        username: JSON.parse(localStorage.getItem("username"))
    }),

    actions: {
        async registerUser(username, email, password) {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            this.userToken = response?.user?.uid;
            await setDoc(doc(db, "users", response.user.uid), {
                id: response.user.uid,
                email: response.user.email,
                username: username,
                avatar: "",
                avatarPath: "",
                createdAt: Timestamp.fromDate(new Date()),
                online: true,
            });
            localStorage.setItem("token", JSON.stringify(this.userToken));
        },

        async loginUser(email,password) {
            const response = await signInWithEmailAndPassword(auth, email, password);
            this.userToken = response?.user?.uid;
            await updateDoc(doc(db, "users", response.user.uid), {
                online: true
            });
            localStorage.setItem("token", JSON.stringify(this.userToken));
        },

        async signOutUser() {
            await signOut(auth);
            this.userToken = null;
            localStorage.removeItem("token");
            localStorage.removeItem("profile");
        },

        async saveProfileImage(profile) {
            this.userImage = profile;
            localStorage.setItem("profile", JSON.stringify(this.userImage));
        },

        async saveUsername(username) {
            this.username = username;
            localStorage.setItem("username", JSON.stringify(this.username));
        }
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}