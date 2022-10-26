<script setup>
import { Icon } from "@iconify/vue";
import useVuelidate from "@vuelidate/core";
import { useRouter } from "vue-router";
import { helpers, minLength, email, required } from "@vuelidate/validators";
import { reactive, computed, ref, watchEffect } from "vue";
import { useAuthStore } from "../stores/authStore";
const formData = reactive({
    email: "",
    password: "",
});

const rules = computed(() => {
    return {
        email: { required: helpers.withMessage("Email is required", required), email },
        password: { required: helpers.withMessage("Password is required", required), minLength: minLength(8) },
    }
})

const v$ = useVuelidate(rules, formData);
const authStore = useAuthStore();
const loading = ref(false);
const token = ref("");
const router = useRouter();
watchEffect(() => {
    loading.value = authStore.loginLoading;
    token.value = authStore.userToken;
    if (token.value) {
        router.push("/profile")
    }
});
const handleSubmit = async () => {
    const result = await v$.value.$validate();
    if (result) {
        await authStore.loginUser(formData.email, formData.password);
    };
}
</script>

<template>
    <div class="grid-layout">
        <div
            class="max-w-sm w-72 mt-8 py-2 border border-gray-200 dark:border-none rounded-md sm:w-80 md:border md:border-gray-300 md:dark:border md:dark:border-gray-800 md:py-0 md:mt-20">
            <form class="w-full bg-white dark:bg-[#0e243b] px-6 py-4 rounded-md" @submit.prevent="handleSubmit">
                <div class="grid-layout">
                    <Icon icon="fa6-brands:meta" class="h-10 w-10 text-[#145ceb]" />
                </div>

                <div :class="[v$.email.$error ? 'pb-0' : 'pb-6']">
                    <label for="email" class="label">Email</label>
                    <input type="email" placeholder="Email" class="input-style" v-model="formData.email">
                    <p class="error" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</p>
                </div>

                <div :class="[v$.password.$error ? 'pb-0' : 'pb-3']">
                    <label for="password" class="label">Password</label>
                    <input type="password" placeholder="Password" class="input-style" v-model="formData.password">
                    <p class="error" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</p>
                </div>

                <div class="py-2">
                    <p class="cursor-pointer text-sm dark:text-white md:text-base">Don't have an account yet? <span
                            class="text-[#145ceb] font-bold hover:text-[#0042c7] dark:hover:text-[#1f6aff] transition duration-200 ease-in">
                            <router-link to="/register">Register</router-link>
                        </span></p>
                </div>

                <div>
                    <button type="submit"
                        class="w-full py-2 px-4 bg-[#145ceb] hover:bg-[#1f6aff] transition duration-200 ease-in text-white rounded-md">Sign
                        In</button>
                </div>
            </form>
        </div>
    </div>
</template>