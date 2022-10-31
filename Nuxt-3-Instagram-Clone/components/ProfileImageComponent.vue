<script setup>
import { getDoc, doc, getFirestore } from "firebase/firestore";
const firebaseUser = useFirebaseUser();
const db = getFirestore();
const authToken = ref("");
const firebaseData = ref([]);
const userData = ref([]);
const profileImage = ref("")
watchEffect(() => {
    authToken.value = firebaseUser.value?.uid;
    getDoc(doc(db, "users", authToken.value)).then((docSnap) => {
        if (docSnap.exists()) {
            firebaseData.value.push(docSnap.data());
            firebaseData.value.forEach((data) => {
                profileImage.value = data.avatar;
                console.log(profileImage.value)
                userData.value.push(data);
            })
        }
    });
});
</script>
<template>
    <div>
        <img :src="profileImage" alt="Profile" class="w-10 h-10 rounded-full"/>
    </div>
</template>