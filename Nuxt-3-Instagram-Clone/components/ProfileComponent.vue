<script setup>
import { reactive, ref, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
const profileData = reactive({
    selectedImage: "",
    blob: ""
});

const rules = computed(() => {
    return {
        selectedImage: { required: helpers.withMessage("Profile image is required", required) }
    }
});

const v$ = useVuelidate(rules, profileData)
const fileUpload = () => {
    const target = event.target;
    const file = target.files[0];
    profileData.selectedImage = file;
    profileData.blob = URL.createObjectURL(file);
};

const handleSubmit = async () => {
    const response = await v$.value.$validate();

    if (response) {
        console.log(response)
    }
}

</script>
<template>
    <div class="grid-center">
        <div class="max-w-sm w-72 mt-4 md:w-80 md:mt-14">
            <form @submit.prevent="handleSubmit()"
                class="w-full bg-white border border-gray-200 shadow-md rounded-md dark:bg-gray-800 dark:border dark:border-gray-700 py-4 px-6">
                <div class="grid-center w-full">
                    <div class="w-24 h-24 grid-center rounded-full bg-gray-200 dark:bg-gray-600">
                        <label for="fileUpload">
                            <Icon name="material-symbols:android-camera-outline"
                                class="w-6 h-6 cursor-pointer transition duration-200 ease-in text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200" />
                        </label>
                        <!-- <img v-if="profileData.blob" :src="profileData.blob" alt="blob" class='h-32 w-32 rounded-full' /> -->
                        <input type="file" hidden name="fileUpload" id="fileUpload" @change="fileUpload" accept="image/*"/>
                    </div>
                    <p v-if="v$.selectedImage.$error" class="error">{{ v$.selectedImage.$errors[0].$message }}</p>
                </div>

                <div class="mt-4">
                    <label for="email" class="form-label">Email</label>
                    <input type="text" placeholder="Email" class="form-input" />
                </div>

                <div class="mt-4">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" placeholder="Username" class="form-input" />
                </div>

                <div class="mt-4">
                    <button class="w-full py-2 px-4 rounded-md text-white bg-[#ec5761] hover:bg-[#ee4550]">Setup Profile</button>
                </div>
        </form>
    </div>
    </div>
</template>