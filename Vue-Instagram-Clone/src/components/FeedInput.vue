<script setup>
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { Icon } from "@iconify/vue";
import { auth, db, storage } from "../firebaseConfig";
import { useToast } from "vue-toastification";
import EmojiPicker from "vue3-emoji-picker";
import "../../node_modules/vue3-emoji-picker/dist/style.css";
import { ref, watchEffect } from "vue";
import { useAuthStore } from "../stores/authStore";
const authStore = useAuthStore();
const inputEl = ref("");
const showEmojis = ref(false);
const loading = ref(false);
const selectedImage = ref("");
const blob = ref("");
const toast = useToast();
const currentUser = auth.currentUser;
const currentImage = ref("");
watchEffect(() => {
    currentImage.value = authStore?.userImage;
    console.log(currentImage.value)
});
function showEmoji(emoji) {
    inputEl.value += emoji.i;
};
const fileUpload = () => {
    const target = event.target;
    const file = target.files[0];
    selectedImage.value = file;
    blob.value = URL.createObjectURL(file);
};
function removeSelectedImage() {
    selectedImage.value = null;
};
async function sendPost() {
    if (selectedImage.value) {
        loading.value = true;
        let sentImage;
        const imageReference = storageRef(storage, `images/${new Date().getTime()} - ${selectedImage.name}`);
        const snap = await uploadBytes(imageReference, selectedImage.value);
        const downloadImageUrl = await getDownloadURL(storageRef(storage, snap.ref.fullPath));
        sentImage = downloadImageUrl
        await addDoc(collection(db, "posts"), {
            id: currentUser.uid,
            username: authStore?.username,
            profile: currentImage.value,
            text: inputEl.value,
            media: sentImage || "",
            timeStamp: serverTimestamp(),
        });
        loading.value = false;
        setTimeout(() => {
            inputEl.value = "";
            selectedImage.value = "";
        }, 1000);
        toast.success("Post sent successfully", {
            timeout: 2000,
        })
    } else {
        toast.error("Please select an image", {
            timeout: 3000,
        })
    }
};
</script>
<template>
    <div
        :class="[loading ? 'flex overflow-y-scroll scrollbar-hide border-b dark:border-gray-800 border-gray-700 p-3 space-x-3 shadow-md opacity-60' : 'flex overflow-y-scroll scrollbar-hide border-b dark:bg-gray-800 dark:border-gray-800 border-gray-200 p-3 shadow-md space-x-3']">
        <div>
            <img :src="currentImage" class="h-11 w-11 rounded-full mr-4" />
        </div>
        <div class="w-full divide-y dark:divide-gray-600 divide-gray-200">
            <div>
                <textarea v-model="inputEl" placeholder="What's happening?"
                    class="w-full min-h-[52px] text-lg tracking-wide bg-transparent outline-none placeholder-gray-500 dark:placeholder-gray-400 dark:text-white text-black" />
                <div v-if="selectedImage">
                    <div class="relative">
                        <div
                            class="absolute w-8 h-8 bg-black bg-opacity-75 hover:bg-gray-800 rounded-full cursor-pointer flex items-center justify-center top-1 left-1">
                            <Icon icon="fa6-solid:xmark" @click="removeSelectedImage()" class="h-5 w-5 text-white" />
                        </div>
                        <img :src="blob" alt="image" width="200" height="200">
                    </div>
                </div>
            </div>

            <div v-if="!loading">
                <div class="flex-between pt-2">
                    <div class="flex-center space-x-4">
                        <div>
                            <label for="fileUpload">
                                <Icon icon="heroicons-outline:photograph" class="text-green-400 h-6 w-6" />
                            </label>
                            <input type="file" @change="fileUpload" hidden name="fileUpload" id="fileUpload"
                                accept="image/*" />
                        </div>

                        <div>
                            <Icon icon="ph:chart-bar-thin" class="text-[#1d9bf0] h-6 w-6" />
                        </div>

                        <div @click="showEmojis = !showEmojis">
                            <Icon icon="ph:smiley" class="text-yellow-400 h-6 w-6" />
                        </div>

                        <div>
                            <Icon icon="ph:calendar-blank-light" class="text-orange-400 h-6 w-6" />
                        </div>

                        <div v-if="showEmojis" class="absolute top-[350px]">
                            <EmojiPicker @select="showEmoji" />
                        </div>
                    </div>
                    <div>
                        <button :disabled="!inputEl"
                            class="bg-[#ec5761] text-white rounded-full shadow-md hover:bg-[#f14651] disabled:hover:bg-[#ec5761] disabled:opacity-50 disabled:cursor-default px-4 py-1.5 font-bold"
                            @click="sendPost()">Post</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>