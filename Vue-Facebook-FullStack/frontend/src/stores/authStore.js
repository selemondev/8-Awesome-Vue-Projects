import { defineStore, acceptHMRUpdate } from "pinia";
import { registerUser } from "../utils/authUrl";
import axios from "axios";
import { useLocalStorage } from "@vueuse/core";
export const useAuthStore = defineStore({
    id: "authStore",
    state: () => ({
        userToken: useLocalStorage("token", ""),
        registerLoading: false,
    }),

    getters: {

    },

    actions: {
        async registerUser(username, email, password) {
            this.registerLoading = true;
            const result = await axios.post(registerUser, { username, email, password });
            this.userToken = result.data?.data?.token;
            this.registerLoading = false;
        }
    },

});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}