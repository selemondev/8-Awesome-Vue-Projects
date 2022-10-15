<script setup>
import useVuelidate from "@vuelidate/core";
import { required, helpers, minLength, email, sameAs } from "@vuelidate/validators";
import { registerUser } from "../composables/useFirebaseAuth";
const loading = ref(false);
const formData = reactive({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
});

const rules = computed(() => {
    return {
        username: { required: helpers.withMessage("Username is required", required) },
        email: { required: helpers.withMessage("Email is required", required), email },
        password: { required: helpers.withMessage("Password is required", required), minLength: minLength(8) },
        confirmPassword: { required: helpers.withMessage("Confirm your password", required), sameAs: sameAs(formData.password) }
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
};

</script>
<template>
    <div class="grid-center">
        <div class="max-w-sm w-72 mt-8 py-2 rounded-md sm:w-80 md:py-0 md:mt-6">
            <form class="w-full bg-white py-4 px-6 rounded-md" @submit.prevent="handleSubmit">
                <div class="grid-center py-1">
                    <Icon name="logos:reddit-icon" class="text-4xl" />
                </div>

                <div class="pb-6">
                    <label for="Username" class="form-username">Username</label>
                    <input type="text" placeholder="Username" class="form-input" v-model="formData.username">
                </div>

                <div class="pb-6">
                    <label for="Email" class="form-username">Email</label>
                    <input type="text" placeholder="Email" class="form-input" v-model="formData.email">
                </div>

                <div class="pb-6">
                    <label for="Password" class="form-username">Password</label>
                    <input type="password" placeholder="Password" class="form-input" v-model="formData.password">
                </div>

                <div class="pb-6">
                    <label for="confirmPassword" class="form-username">ConfirmPassword</label>
                    <input type="password" placeholder="ConfirmPassword" class="form-input" v-model="formData.confirmPassword">
                </div>

                <div class="pb-4">
                    <button
                        class="w-full py-2 px-4 bg-blue-600 rounded-md text-white font-bold hover:bg-blue-700 hover:transition hover:duration-200 hover:ease-in">
                        Sign Up</button>
                </div>

                <div
                    class="flex-center pb-3  before:content-[''] before:flex-1 before:text-gray-300 before:mt-1 before:border before:border-t-1 after:content-[''] after:flex-1 after:text-gray-300 after:mt-1 after:border after:border-t-1">
                    <h4 class="text-gray-400 mx-4">OR</h4>
                </div>

                <div class="pb-4">
                    <button
                        class="w-full py-2 px-4 border border-blue-500 rounded-md text-white space-x-2 hover:border hover:border-blue-700 hover:transition hover:duration-200 hover:ease-in">
                        <span>
                            <Icon name="logos:google-icon" />
                        </span>
                        <span class="text-sm text-black font-semibold hover:font-bold">Continue With Google</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>