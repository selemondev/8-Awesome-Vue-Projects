<script setup>
import { Icon } from "@iconify/vue";
import useVuelidate from "@vuelidate/core";
import { helpers, minLength, sameAs, email, required } from "@vuelidate/validators"; 
import { reactive } from "vue";
const formData = reactive({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
});

const rules = {
    email: { required: helpers.withMessage("Email is required", required), email },
    username: { required: helpers.withMessage("Username is required", required) },
    password: { required: helpers.withMessage("Password is required", required), minLength: minLength(8) },
    confirmPassword: { required: helpers.withMessage("Passwords do not match", required), sameAs: sameAs(formData.password) }
};

const v$ = useVuelidate(rules, formData);

const handleSubmit = async () => {
    const result = await v$.value.$validate();

}
</script>

<template>
    <div class="grid-layout">
        <div
            class="max-w-sm w-72 mt-4 py-2 border border-gray-200 dark:border-none rounded-md sm:w-80 md:border md:border-gray-300 md:dark:border md:dark:border-gray-800 md:py-0 md:mt-6">
            <form class="w-full bg-white dark:bg-[#0e243b] px-6 py-4 rounded-md" @submit.prevent="handleSubmit()">
                <div class="grid-layout">
                    <Icon icon="fa6-brands:meta" class="h-10 w-10 text-[#145ceb]" />
                </div>

                <div :class="[v$.username.$error ? 'pb-0' : 'pb-6']">
                    <label for="username" class="label">Username</label>
                    <input type="text" placeholder="Username" class="input-style" v-model="formData.username">
                    <p class="error" v-if="v$.username.$error">{{v$.username.$errors[0].$message}}</p>
                </div>

                <div :class="[v$.email.$error ? 'pb-0' : 'pb-6']">
                    <label for="email" class="label">Email</label>
                    <input type="email" placeholder="Email" class="input-style" v-model="formData.email">
                    <p class="error" v-if="v$.email.$error">{{v$.email.$errors[0].$message}}</p>
                </div>

                <div :class="[v$.password.$error ? 'pb-0' : 'pb-6']">
                    <label for="password" class="label">Password</label>
                    <input type="password" placeholder="Password" class="input-style" v-model="formData.password">
                    <p class="error" v-if="v$.password.$error">{{v$.password.$errors[0].$message}}</p>
                </div>

                <div :class="[v$.confirmPassword.$error ? 'pb-0' : 'pb-6']">
                    <label for="confirmPassword" class="label">ConfirmPassword</label>
                    <input type="password" placeholder="ConfirmPassword" class="input-style" v-model="formData.confirmPassword">
                    <p class="error" v-if="v$.confirmPassword.$error">{{v$.confirmPassword.$errors[0].$message}}</p>
                </div>

                <div :class="[v$.confirmPassword.$error ? 'pt-3' : 'pt-1']">
                    <button type="submit"
                        class="w-full py-2 px-4 bg-[#145ceb] hover:bg-[#1f6aff] transition duration-200 ease-in text-white rounded-md">Sign
                        Up</button>
                </div>
            </form>
        </div>
    </div>
</template>