<script setup>
import useVuelidate from "@vuelidate/core";
import { required, helpers, minLength, email } from "@vuelidate/validators";
import { loginUser } from "../composables/useFirebaseAuth";
const loading = ref(false);
const formData = reactive({
    username: "",
    email: "",
    password: ""
});

const rules = computed(() => {
    return {
        username: { required: helpers.withMessage("Username is required", required) },
        email: { required: helpers.withMessage("Email is required", required), email },
        password: { required: helpers.withMessage("Password is required", required), minLength: minLength(8) }
    }
});

const v$ = useVuelidate(rules, formData);

const handleSubmit = async () => {
    const result = await v$.value.$validate();
    if (result) {
        loading.value = true;
        await loginUser(formData.email, formData.password);
        loading.value = false;
    }
};

</script>
<template>
    <div class="grid-center">
        <div class="max-w-sm w-72 mt-8 py-2 rounded-md sm:w-80 md:py-0 md:mt-10">
            <form @submit.prevent="handleSubmit" class="w-full bg-white py-4 px-6 rounded-md">
                <div class="grid-center py-1">
                    <Icon name="logos:reddit-icon" class="text-4xl" />
                </div>

                <div :class="[ v$.username.$error ? 'pb-0' : 'pb-6']">
                    <label for="Username" class="form-username">Username</label>
                    <input type="text" placeholder="Username" class="form-input" v-model="formData.username">
                    <p class="error" v-if="v$.username.$error">{{ v$.username.$errors[0].$message}}</p>
                </div>

                <div :class="[v$.email.$error ? 'pb-0' : 'pb-6']">
                    <label for="Email" class="form-username">Email</label>
                    <input type="text" placeholder="Email" class="form-input" v-model="formData.email">
                    <p class="error" v-if="v$.email.$error">{{ v$.email.$errors[0].$message}}</p>
                </div>

                <div :class="[v$.password.$error ? 'pb-0' : 'pb-3']">
                    <label for="Password" class="form-username">Password</label>
                    <input type="password" placeholder="Password" class="form-input" v-model="formData.password">
                    <p class="error" v-if="v$.password.$error">{{ v$.password.$errors[0].$message}}</p>
                </div>

                <div class="mt-1 mb-3">
                    <p>Not a redditor yet? <span class="text-blue-500 hover:text-blue-600 font-bold">
                        <NuxtLink to="/register">
                            Register
                        </NuxtLink>
                    </span></p>
                </div>

                <div class="pb-4">
                    <button type="submit" class="w-full py-2 px-4 bg-blue-600 rounded-md text-white font-bold hover:bg-blue-700 hover:transition hover:duration-200 hover:ease-in">
                        {{ loading ? "Signing In..." : "Sign In"}}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>