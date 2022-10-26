<script setup>
import { Icon } from '@iconify/vue';
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { reactive, computed, ref, watchEffect } from "vue";
const formData = reactive({
    bio: "",
    city: "",
    from: "",
    work: "",
    profilePicture: "",
    coverPicture: ""
});

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
            <h2 class="mt-3 text-2xl text-[#145ceb] dark:text-[#3d77b5] font-bold md:text-4xl">Set up your Profile</h2>
        </div>
        <div class="flex flex-col mt-6 rounded-md border border-gray-300 dark:border-none dark:bg-[#112e4d] h-[560px] md:h-[400px] md:w-[550px]">
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

            <div class="flex flex-col md:flex md:flex-row md:flex-between md:flex-wrap mt-3 px-3">
                <div class="flex-center space-x-2 pb-3">
                    <Icon icon="carbon:user" class="w-10 h-10 text-[#3563be] dark:text-[#3e648d]" />
                    <input type="text" placeholder="Username" class="profile-input-style">
                </div>

                <div class="flex-center space-x-2 pb-3">
                    <Icon icon="ic:outline-email" class="w-10 pt-2 h-10 text-[#3563be] dark:text-[#3e648d]" />
                    <input type="email" placeholder="Email" class="profile-input-style">
                </div>

                <div class="flex-center space-x-2 pb-3">
                    <Icon icon="ph:pencil-simple" class="w-10 pt-2 h-10 text-[#3563be] dark:text-[#3e648d]" />
                    <input type="text" placeholder="Bio" class="profile-input-style">
                </div>

                <div class="flex-center space-x-2 pb-3">
                    <Icon icon="material-symbols:location-on-outline" class="w-10 pt-2 h-10 text-[#3563be] dark:text-[#3e648d]" />
                    <input type="text" placeholder="City" class="profile-input-style">
                </div>

                <div class="flex-center space-x-2 pb-3">
                    <Icon icon="ri:home-4-line" class="w-10 pt-2 h-10 text-[#3563be] dark:text-[#3e648d]" />
                    <input type="text" placeholder="Home" class="profile-input-style">
                </div>

                <div class="flex-center space-x-2 pb-3">
                    <Icon icon="octicon:briefcase-24" class="w-10 pt-2 h-10 text-[#3563be] dark:text-[#3e648d]" />
                    <input type="text" placeholder="Work" class="profile-input-style">
                </div>

            </div>

            <div class="grid-layout md:mt-4">
                <button class="py-2 px-6 text-white bg-[#145ceb] hover:bg-[#0344c6] dark:bg-[#3e648d] dark:text-white dark:hover:bg-[#255180] transition duration-200 ease-in rounded-md">Save Profile</button>
            </div>
        </div>
    </div>
</template>