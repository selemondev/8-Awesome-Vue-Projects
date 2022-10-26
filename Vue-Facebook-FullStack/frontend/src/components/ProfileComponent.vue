<script setup>
import { Icon } from '@iconify/vue';
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import axios from 'axios';
import { reactive, computed, ref, watchEffect } from "vue";
import { useAuthStore } from '../stores/authStore';
import { credentials } from "../utils/authUrl";
const authStore = useAuthStore();
const formData = reactive({
    bio: "",
    city: "",
    from: "",
    work: "",
    profilePicture: "",
    coverPicture: ""
});

const token = ref("");
const data = ref([]);
watchEffect(() => {
    token.value = authStore.userToken;
});

const config = {
    headers: {
        authorization: `Bearer ${token.value}`
    }
};

const getCredentials = async () => {
    const response = await axios.get(credentials, config);
    console.log(response);
    data.value = response;
};
getCredentials();

const rules = computed(() => {
    return {
        profilePicture: { required: helpers.withMessage("Profile picture is required", required) },
        coverPicture: { required: helpers.withMessage("Cover picture is required", required) },
        bio: { required: helpers.withMessage("Bio is required", required) },
        city: { required: helpers.withMessage("City is required", required) },
        work: { required: helpers.withMessage("Job title is required", required) },
        from: { required: helpers.withMessage("Home origin is required", required) },
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
    <div class="grid-layout">

        <div>
            <h2 class="mt-3 text-xl text-[#145ceb] dark:text-[#3d77b5] font-bold md:text-2xl">Set up your Profile</h2>
        </div>
        <div
         :class="[v$.work.$error ? 'flex flex-col mt-6 rounded-md border border-gray-300 dark:border-none dark:bg-[#112e4d] h-[620px] md:h-[420px] md:w-[550px]' : 'flex flex-col mt-6 rounded-md border border-gray-300 dark:border-none dark:bg-[#112e4d] h-[560px] md:h-[390px] md:w-[550px]']">
            <div class="w-full">
                <div class="flex-center h-20 bg-gray-300 dark:bg-white w-full">
                    <Icon icon="material-symbols:android-camera-outline"
                        class="h-10 w-10 opacity-30 cursor-pointer hover:opacity-80 transition duration-200 ease-in" />
                </div>
            </div>

            <div class="grid-layout">
                <div class="-mt-8 h-20 w-20 bg-gray-600/70 dark:bg-[#394c61] rounded-full">
                    <div class="flex justify-center items-center mt-6">
                        <Icon icon="material-symbols:android-camera-outline"
                            class="h-8 w-8 opacity-30 cursor-pointer hover:opacity-80 transition duration-200 ease-in" />
                    </div>
                </div>
            </div>

            <form @submit.prevent="handleSubmit">

                <div class="flex flex-col md:flex md:flex-row md:flex-between md:flex-wrap mt-3 px-3">
                    <div class="flex-center space-x-2 pb-3">
                        <Icon icon="carbon:user" class="w-10 h-10 text-[#3563be] dark:text-[#3e648d]" />
                        <input type="text" placeholder="Username" class="profile-input-style">
                    </div>

                    <div class="flex-center space-x-2 pb-3">
                        <Icon icon="ic:outline-email" class="w-10 pt-2 h-10 text-[#3563be] dark:text-[#3e648d]" />
                        <input type="email" placeholder="Email" class="profile-input-style">
                    </div>

                    <div :class="[v$.bio.$error ? 'pb-0' : 'pb-3']">
                        <div class="flex-center space-x-2 ">
                            <Icon icon="ph:pencil-simple" class="w-10 pt-2 h-10 text-[#3563be] dark:text-[#3e648d]" />
                            <input type="text" placeholder="Bio" class="profile-input-style" v-model="formData.bio">
                        </div>
                        <p class="error text-center" v-if="v$.bio.$error">{{ v$.bio.$errors[0].$message }}</p>
                    </div>

                    <div :class="[v$.city.$error ? 'pb-0' : 'pb-3']">
                        <div class="flex-center space-x-2">
                            <Icon icon="material-symbols:location-on-outline"
                                class="w-10 pt-2 h-10 text-[#3563be] dark:text-[#3e648d]" />
                            <input type="text" placeholder="City" class="profile-input-style" v-model="formData.city">
                        </div>
                        <p class="error text-center" v-if="v$.city.$error">{{ v$.city.$errors[0].$message }}</p>
                    </div>

                    <div :class="[v$.from.$error ? 'pb-0' : 'pb-3']">
                        <div class="flex-center space-x-2">
                            <Icon icon="ri:home-4-line" class="w-10 pt-2 h-10 text-[#3563be] dark:text-[#3e648d]" />
                            <input type="text" placeholder="Home" class="profile-input-style" v-model="formData.from">
                        </div>
                        <p class="error text-center" v-if="v$.from.$error">{{ v$.from.$errors[0].$message }}</p>
                    </div>

                    <div :class="[v$.work.$error ? 'pb-0' : 'pb-3']">
                        <div class="flex-center space-x-2">
                            <Icon icon="octicon:briefcase-24"
                                class="w-10 pt-2 h-10 text-[#3563be] dark:text-[#3e648d]" />
                            <input type="text" placeholder="Work" class="profile-input-style" v-model="formData.work">
                        </div>
                        <p class="error text-center" v-if="v$.work.$error">{{ v$.work.$errors[0].$message }}</p>
                    </div>
                </div>

                <div class="grid-layout md:mt-2">
                    <button type="submit"
                        class="py-2 px-6 text-white bg-[#145ceb] hover:bg-[#0344c6] dark:bg-[#3e648d] dark:text-white dark:hover:bg-[#255180] transition duration-200 ease-in rounded-md">Save
                        Profile</button>
                </div>

            </form>
        </div>
    </div>
</template>