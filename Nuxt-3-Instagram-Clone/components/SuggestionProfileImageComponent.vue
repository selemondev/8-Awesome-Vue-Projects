<script setup>
import { getDoc, doc, getFirestore } from "firebase/firestore";
import { useFirebaseUser } from "../composables/state"
const firebaseUser = useFirebaseUser();
const db = getFirestore();
const authToken = ref("");
const firebaseData = ref([]);
const userData = ref([]);
const profileImage = ref("");
const username = ref("")
watchEffect(() => {
    authToken.value = firebaseUser.value?.uid;
    getDoc(doc(db, "users", authToken.value)).then((docSnap) => {
        if (docSnap.exists()) {
            firebaseData.value.push(docSnap.data());
            firebaseData.value.forEach((data) => {
                profileImage.value = data.avatar;
                username.value = data.username;
                userData.value.push(data);
            })
        }
    });
});
</script>
<template>
    <div class="flex-between px-3">
        <div class="flex-center space-x-3">
            <img :src="profileImage" alt="Profile" class="w-10 h-10 rounded-full" />
            <h3 class="dark:text-white">{{ username }}</h3>
        </div>
        <p class="text-blue-500">Sign Out</p>
    </div>
</template>