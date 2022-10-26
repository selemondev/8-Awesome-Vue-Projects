import { defineStore, acceptHMRUpdate } from "pinia";
import { registerUser, loginUser } from "../utils/authUrl";
import axios from "axios";
export const useAuthStore = defineStore({
    id: "authStore",
    state: () => ({
        userToken: JSON.parse(localStorage.getItem("token")),
        registerLoading: false,
        loginLoading: false,
    }),

    getters: {

    },

    actions: {
        async registerUser(username, email, password) {
            this.registerLoading = true;
            const response = await axios.post(registerUser, { username, email, password });
            this.userToken = response.data?.token;
            this.registerLoading = false;
            localStorage.setItem("token", JSON.stringify(response.data?.token));
        },

        async loginUser(email, password) {
            this.loginLoading = true;
            const response = await axios.post(loginUser, { email, password });
            this.userToken = response.data?.token;
            this.loginLoading = false;
            localStorage.setItem("token", JSON.stringify(response.data?.token))
        },
    },

});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}