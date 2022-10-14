import { defineStore, acceptHMRUpdate } from "pinia";
import { supabase } from "../supabaseConfig";
export const useAuthStore = defineStore({
  id: "auth",
  state:() => ({
    userData: JSON.parse(localStorage.getItem("user")),
    registerErrorMsg: "",
    registerLoading: false,
    loginErrorMsg: "",
    loginLoading: false,
    logOutLoading: false,
    logOutErrorMsg: "",
  }),
  
  actions: {
    async registerUser(email, password) {
      this.registerLoading = true;
        const { error } = await supabase.auth.signUp({
          email: email,
          password: password
        });
        const auth = supabase.auth.user();
        this.userData = auth.id;
        this.registerLoading = false;
        localStorage.setItem("user", JSON.stringify(this.userData));
        this.registerErrorMsg = error?.message;
    },

    async loginUser(email, password) {
      this.loginLoading = true;
      const { error } = await supabase.auth.signIn({
        email: email,
        password: password
      });

      const auth = supabase.auth.user();
      this.userData = auth.id;
      this.loginLoading = false;
      localStorage.setItem("user", JSON.stringify(this.userData));
      this.loginErrorMsg = error?.message;
    },

    async logOut() {
      this.logOutLoading = true;
      const { error } = await supabase.auth.signOut();
      this.userData = null;
      this.logOutLoading = false;
      localStorage.removeItem("user");
      this.logOutErrorMsg = error?.message;
    },
  }
});

if( import.meta.hot ) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
