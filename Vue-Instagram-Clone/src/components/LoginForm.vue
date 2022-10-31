<script setup>
import useVuelidate from "@vuelidate/core";
import { minLength, helpers, required, email } from "@vuelidate/validators";
import { Icon } from "@iconify/vue"
import {
    ref, reactive, computed, watchEffect
} from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const router = useRouter();
const token = ref("");
watchEffect(() => {
    token.value = authStore.userToken;
    if (token.value) {
        router.push("/feed")
    }
})
const formData = reactive({
    email: "",
    password: "",
});

const rules = computed(() => {
    return {
        email: { required: helpers.withMessage("Email is required", required), email },
        password: { required: helpers.withMessage("Password is required", required), minLength: minLength(8) },
    }
});

const v$ = useVuelidate(rules, formData);
const loginLoading = ref(false);
const handleSubmit = async () => {
    const result = await v$.value.$validate();

    if (result) {
        loginLoading.value = true;
        await authStore.loginUser(formData.email, formData.password)
        loginLoading.value = false;
    }
}
</script>

<template>
    <div class="grid-center">
        <div class="max-w-sm w-72 mt-24 md:w-80 md:mt-32">
            <form @submit.prevent="handleSubmit()"
                class="w-full shadow-md rounded-md py-4 px-6 border border-gray-200 dark:bg-gray-800/75 dark:border dark:border-gray-900">
                <div class="grid-center">
                    <Icon icon="simple-icons:instagram" class="w-8 h-8 dark:text-white" />
                </div>

                <div :class="[v$.email.$error ? 'pb-0' : 'pb-3']">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" placeholder="Email" class="form-input" v-model="formData.email" />
                    <p class="error" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</p>
                </div>

                <div :class="[v$.password.$error ? 'pb-0' : 'pb-2']">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" placeholder="Password" class="form-input" v-model="formData.password" />
                    <p class="error" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</p>
                </div>

                <div class="my-3">
                    <p class="text-sm dark:text-white md:text-base">Don't have an account yet? <span
                            class="text-[#E5515B] hover:text-[#f94a56] cursor-pointer">
                            <router-link to="/register">
                                Register
                            </router-link>
                        </span></p>
                </div>

                <div>
                    <button type="submit" class="form-btn">
                        {{ loginLoading ? "Signing In..." : "Sign In" }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>