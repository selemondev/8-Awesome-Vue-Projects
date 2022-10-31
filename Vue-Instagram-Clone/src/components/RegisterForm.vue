<script setup>
import useVuelidate from "@vuelidate/core";
import { minLength, sameAs, helpers, required, email } from "@vuelidate/validators";
import { ref, reactive, computed, watchEffect } from "vue";
import { Icon } from "@iconify/vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const router = useRouter();
const token = ref("");
watchEffect(() => {
    token.value = authStore.userToken;
    if (token.value) {
        router.push("/profile")
    }
})
const formData = reactive({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
});

const rules = computed(() => {
    return {
        username: { required: helpers.withMessage("Username is required", required) },
        email: { required: helpers.withMessage("Email is required", required), email },
        password: { required: helpers.withMessage("Password is required", required), minLength: minLength(8) },
        confirmPassword: { required: helpers.withMessage("Passwords do not match", required), sameAs: sameAs(formData.password) }
    }
});

const v$ = useVuelidate(rules, formData);
const registerLoading = ref(false);
const handleSubmit = async () => {
    const result = await v$.value.$validate();
    if (result) {
        registerLoading.value = true;
        await authStore.registerUser(formData.username, formData.email, formData.password);
        registerLoading.value = false;
    }
}
</script>

<template>
    <div class="grid-center">
        <div class="max-w-sm w-72 mt-24 md:w-80 md:mt-24">
            <form @submit.prevent="handleSubmit()"
                class="w-full shadow-md rounded-md py-4 px-6 border border-gray-200 dark:bg-gray-800/75 dark:border dark:border-gray-900">
                <div class="grid-center">
                   <Icon icon="simple-icons:instagram" class="w-8 h-8 dark:text-white"/>
                </div>

                <div :class="[v$.username.$error ? 'pb-0' : 'pb-3']">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" placeholder="Username" class="form-input" v-model="formData.username" />
                    <p class="error" v-if="v$.username.$error">{{ v$.username.$errors[0].$message }}</p>
                </div>

                <div :class="[v$.email.$error ? 'pb-0' : 'pb-3']">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" placeholder="Email" class="form-input" v-model="formData.email" />
                    <p class="error" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</p>
                </div>

                <div :class="[v$.password.$error ? 'pb-0' : 'pb-3']">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" placeholder="Password" class="form-input" v-model="formData.password" />
                    <p class="error" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</p>
                </div>

                <div :class="[v$.confirmPassword.$error ? 'pb-0' : 'pb-3']">
                    <label for="password" class="form-label">ConfirmPassword</label>
                    <input type="password" placeholder="Password" class="form-input"
                        v-model="formData.confirmPassword" />
                    <p class="error" v-if="v$.confirmPassword.$error">{{ v$.confirmPassword.$errors[0].$message }}</p>
                </div>

                <div>
                    <button type="submit" class="form-btn">
                        {{ registerLoading ? "Signing Up..." : "Sign Up" }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>