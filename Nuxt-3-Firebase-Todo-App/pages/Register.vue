<script setup>
import useVuelidate from "@vuelidate/core";
import { required, helpers, email, minLength, sameAs } from "@vuelidate/validators";
const loading = ref(false);
const formData = reactive({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
});
const rules = computed(() => {
    return {
        email: { required: helpers.withMessage("Email is required", required), email },
        username: { required: helpers.withMessage("Username is required", required)},
        password: { required: helpers.withMessage("Password is required", required), minLength: minLength(8) },
        confirmPassword: { required: helpers.withMessage("Passwords do not match", required), sameAs: sameAs(formData.password) },
    }
});
const v$ = useVuelidate(rules, formData);
const handleSubmit = async () => {
    const result = await v$.value.$validate();
    if (result) {
        loading.value = true;
        await registerUser(formData.email, formData.password);
        loading.value = false;
    }
}
</script>
<template>
        <div class="grid-layout">
            <div
                class="max-w-sm w-72 mt-2 py-2 border border-gray-900 rounded-md sm:w-80 md:border-none md:py-0 md:mt-6">
                <form class="bg-black/75 w-full px-6 py-4 rounded-md" @submit.prevent="handleSubmit">
                    <div class="grid-layout py-1">
                        <img src='https://api.iconify.design/logos:nuxt-icon.svg' alt="Nuxt" class="h-10 w-10">
                    </div>
                    <div :class="[v$.username.$error ? 'pb-0' : 'pb-6']">
                        <label for="Username" class="label">Username</label>
                        <input v-model="formData.username" type="text" placeholder="Username" class="input-style">
                        <p class="error" v-if="v$.username.$error">{{v$.username.$errors[0].$message}}</p>
                    </div>
                    <div :class="[v$.email.$error ? 'pb-0' : 'pb-6']">
                        <label for="Email" class="label">Email</label>
                        <input v-model="formData.email" type="email" placeholder="Email" class="input-style">
                        <p class="error" v-if="v$.email.$error">{{v$.email.$errors[0].$message}}</p>
                    </div>
                    <div :class="[v$.password.$error ? 'pb-0' : 'pb-6']">
                        <label for="password" class="label">Password</label>
                        <input v-model="formData.password" type="password" placeholder="Password" class="input-style">
                        <p class="error" v-if="v$.password.$error">{{v$.password.$errors[0].$message}}</p>
                    </div>

                    <div :class="[v$.confirmPassword.$error ? 'pb-0' : 'pb-6']">
                        <label for="confirmPassword" class="label">ConfirmPassword</label>
                        <input v-model="formData.confirmPassword" type="password" placeholder="ConfirmPassword"
                            class="input-style">
                        <p class="error" v-if="v$.confirmPassword.$error">{{v$.confirmPassword.$errors[0].$message}}</p>
                    </div>

                    <div>
                        <button type="submit"
                            class="w-full bg-green-600 text-white py-2 px-2 rounded-md hover:bg-green-700 transition duration-200 ease-in">
                            {{ loading ? "Signing Up..." : "Sign Up"}}
                        </button>
                    </div>
                </form>
            </div>
        </div>
</template>