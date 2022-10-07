<script setup>
import { required, email, helpers, minLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
const formData = reactive({
    email: "",
    password: ""
});
const loading = ref(false);
const rules = computed(() => {
    return {
        email: { required: helpers.withMessage("Email is required", required), email },
        password: { required: helpers.withMessage("Password is required", required), minLength: minLength(8) },
    }
});
const v$ = useVuelidate(rules, formData);
const handleSubmit = async () => {
    const result = await v$.value.$validate();
    if (result) {
        loading.value = true;
        await loginUser(formData.email, formData.password);
        loading.value = false;
    };

}
</script>
<template>
    <div class="grid-layout">
        <div class="max-w-sm w-72 mt-8 py-2 border border-gray-900 rounded-md sm:w-80 md:border-none md:py-0 md:mt-14">
            <form class="bg-black/75 w-full px-6 py-4 rounded-md" @submit.prevent="handleSubmit">
                <div class="grid-layout py-1">
                    <img src='https://api.iconify.design/logos:nuxt-icon.svg' alt="Nuxt" class="h-10 w-10">
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

                <div class="mt-1 mb-3">
                    <p class="cursor-pointer text-gray-400 text-sm md:text-base">Don't have an account yet? <span
                            class=" text-green-300 hover:text-green-600 transition duration-200 ease-in">
                            <NuxtLink to="/register">Register</NuxtLink>
                        </span></p>
                </div>
    
                <div>
                    <button type="submit"
                        class="w-full bg-green-600 text-white py-2 px-2 rounded-md hover:bg-green-700 transition duration-200 ease-in">
                        {{ loading ? "Signing In..." : "Sign In"}}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>