<script setup>
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { ref, watchEffect } from "vue";
import { useAuthStore } from "../stores/authStore";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
const router = useRouter();
const authStore = useAuthStore();
const authToken = auth?.currentUser?.uid;
const firebaseData = ref([]);
const profileImage = ref("");
const username = ref("")
watchEffect(() => {
    getDoc(doc(db, "users", authToken)).then((docSnap) => {
        if (docSnap.exists()) {
            firebaseData.value.push(docSnap.data());
            firebaseData.value.forEach((data) => {
                profileImage.value = data.avatar;
                authStore.saveProfileImage(profileImage.value);
                username.value = data.username;
                authStore.saveUsername(username.value)
            })
        }
    });
});
const handleClick = async () => {
    await authStore.signOutUser();
    router.push("/")
};
</script>
<template>
    <div class="flex-between px-3">
        <div class="flex-center space-x-3">
            <div>
                <div v-if="profileImage">
                    <img :src="profileImage" alt="Profile" class="w-10 h-10 rounded-full" />
                </div>
                <div v-else class="grid-center h-8 w-8 bg-gray-300 dark:bg-gray-400 rounded-full">
                    <Icon icon="carbon:user" class="w-5 h-5" />
                </div>
            </div>
            <h3 class="dark:text-white">{{ username }}</h3>
        </div>
        <p class="text-blue-500 hover:text-blue-700 cursor-pointer" @click="handleClick">Sign Out</p>
    </div>
</template>