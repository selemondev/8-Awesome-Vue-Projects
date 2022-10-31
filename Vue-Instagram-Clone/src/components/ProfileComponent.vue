<script setup>
import { Icon } from "@iconify/vue";
import { reactive, ref, computed, watchEffect } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { ref as storageRef, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebaseConfig";
import { useRouter } from "vue-router";
const authToken = auth?.currentUser?.uid;
const firebaseData = ref([]);
const userData = ref([]);
const username = ref("");
const email = ref("");
const loading = ref("");
const router = useRouter();
watchEffect(() => {
    getDoc(doc(db, "users", authToken)).then((docSnap) => {
        if (docSnap.exists()) {
            firebaseData.value.push(docSnap.data());
            firebaseData.value.forEach((data) => {
                username.value = data.username;
                email.value = data.email;
                userData.value.push(data);
            })
        }
    });
});
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
        if (profileData.selectedImage) {
            try {
                if (userData.value?.avatarPath) {
                    await deleteObject(storageRef(storage, userData.value.avatarPath));
                };

                loading.value = true;
                let profileImage;
                const imageReference = storageRef(storage, `images/${new Date().getTime()} - ${profileData.selectedImage}`);
                const snap = await uploadBytes(imageReference, profileData.selectedImage);
                const downloadProfileImageUrl = await getDownloadURL(storageRef(storage, snap.ref.fullPath));
                profileImage = downloadProfileImageUrl;

                await updateDoc(doc(db, "users", authToken), {
                    avatar: profileImage,
                    avatarPath: snap.ref.fullPath
                });
                loading.value = false;
                profileData.selectedImage = ""
            } catch (err) {
                console.log(err.message)
            }
        } else {
            error.value = "Choose your profile image";
            setTimeout(() => {
                error.value = ""
            }, 2000)
        };

        router.push("/feed")
    }
}

</script>
<template>
    <div class="grid-center">
        <div class="max-w-sm w-72 mt-24 md:w-80 md:mt-32">
            <form @submit.prevent="handleSubmit()"
                class="w-full bg-white border border-gray-200 shadow-md rounded-md dark:bg-gray-800 dark:border dark:border-gray-700 py-4 px-6">
                <div class="grid-center w-full">
                    <div>
                        <label for="fileUpload">
                            <div v-if="!profileData.blob"
                                class="w-24 h-24 grid-center rounded-full bg-gray-200 dark:bg-gray-600">
                                <Icon icon="material-symbols:android-camera-outline"
                                    class="w-6 h-6 cursor-pointer transition duration-200 ease-in text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200" />
                            </div>
                        </label>
                        <img v-if="profileData.blob" :src="profileData.blob" alt="blob"
                            class='h-32 w-32 rounded-full' />
                        <input type="file" hidden name="fileUpload" id="fileUpload" @change="fileUpload"
                            accept="image/*" />
                    </div>
                    <p v-if="v$.selectedImage.$error" class="error">{{ v$.selectedImage.$errors[0].$message }}</p>
                </div>

                <div class="mt-4">
                    <label for="email" class="form-label">Email</label>
                    <input type="text" placeholder="Email" class="form-input" v-model="email" />
                </div>

                <div class="mt-4">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" placeholder="Username" class="form-input" v-model="username" />
                </div>

                <div class="mt-4">
                    <button type="submit" class="w-full py-2 px-4 rounded-md text-white bg-[#ec5761] hover:bg-[#ee4550]">{{ loading ? "Setting Up profile ..." : "Setup profile"}}</button>
                </div>
            </form>
        </div>
    </div>
</template>