<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { minLength, helpers, required, email } from "@vuelidate/validators";
import { ref, reactive, computed } from "vue";
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

const handleSubmit = async () => {
    const result = await v$.value.$validate();

    if (result) {

    }
}
</script>

<template>
    <div class="grid-center">
        <div class="max-w-sm w-72 mt-12 md:w-80 md:mt-20">
            <form @submit.prevent="handleSubmit()"
                class="w-full shadow-md rounded-md py-4 px-6 border border-gray-200 dark:bg-gray-800/75 dark:border dark:border-gray-900">
                <div class="grid-center">
                    <Icon name="simple-icons:instagram" class="w-8 h-8 dark:text-white" />
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
                    <p class="text-sm dark:text-white md:text-base">Don't have an account yet? <span class="text-[#E5515B] hover:text-[#f94a56] cursor-pointer">
                        <NuxtLink to="/register">
                            Register
                        </NuxtLink>
                    </span></p>
                </div>

                <div>
                    <button type="submit" class="form-btn">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>