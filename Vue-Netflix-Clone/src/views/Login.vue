<script setup>
import NetflixIcon from "../assets/images/Netflix-Icon.png";
import Header from "../components/Header.vue";
import { reactive, computed, watchEffect, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers, email, minLength } from "@vuelidate/validators";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const error = ref("");
const loading = ref(false);
const router = useRouter();
const token = ref([])
const formData = reactive({
  email: "",
  password: "",
});
watchEffect(() => {
  error.value = authStore.loginErrorMsg;
  loading.value = authStore.loginLoading;
  token.value = authStore.userData;
  if( token.value ) {
    router.push("/home")
  }
})
const rules = computed(() => {
  return {
    email: { required: helpers.withMessage("Email is required", required), email},
    password: { required: helpers.withMessage("Password is required", required), minLength: minLength(8)},
  }
});
const v$ = useVuelidate(rules, formData);
const handleSubmit = async () => {
  const result = await v$.value.$validate();
  if( result ) {
    authStore.loginUser(formData.email, formData.password)
  }
}
</script>
<template>
    <div class="min-h-screen w-full bg-black md:items-center md:justify-center md:bg-transparent">
      <Header/>
        <div class="grid-layout">
            <div class="max-w-sm w-72 mt-14 py-2 border border-gray-900 rounded-md sm:w-80 md:border-none md:py-0 md:mt-24">
                <form class="bg-black/75 w-full px-6 py-4 rounded-md" @submit.prevent="handleSubmit">
                    <div class="grid-layout pb-4">
                        <img :src="NetflixIcon" alt="Netflix" class="w-10 h-10">
                    </div>
                    <div class="pb-6">
                        <label for="Email" class="label">Email</label>
                        <input v-model="formData.email" type="email" placeholder="Email" class="input-style">
                        <p class="error" v-if="v$.email.$error">{{v$.email.$errors[0].$message}}</p>
                    </div>
                    <div class="pb-2">
                        <label for="password" class="label">Password</label>
                        <input v-model="formData.password" type="password" placeholder="Password" class="input-style">
                         <p class="error" v-if="v$.password.$error">{{v$.password.$errors[0].$message}}</p>
                    </div>

                    <div class="py-2">
                        <p class="cursor-pointer text-gray-400 text-sm md:text-base">Don't have an account yet? <span class="text-gray-300 hover:text-red-600 transition duration-200 ease-in"><router-link to="/register">Register</router-link></span></p>
                    </div>

                    <div>
                        <button type="submit" class="w-full bg-red-600 text-white py-2 px-2 rounded-md hover:bg-red-700 transition duration-200 ease-in">{{ loading ? "Signing In..." : "Sign In"}}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>