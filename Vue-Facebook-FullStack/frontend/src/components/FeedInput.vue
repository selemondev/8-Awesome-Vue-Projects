<script setup>
import { PhotoIcon, VideoCameraIcon, ChartBarIcon, XMarkIcon, FaceSmileIcon } from "@heroicons/vue/24/outline";
import EmojiPicker from "vue3-emoji-picker";
import "../../node_modules/vue3-emoji-picker/dist/style.css";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { ref, watchEffect } from "vue";
import { credentials } from "../utils/authUrl";
import { postCreateUrl } from "../utils/postUrl";
import { useAuthStore } from "../stores/authStore";
import axios from "axios";
const authStore = useAuthStore();
const token = ref("");
const inputEl = ref("");
const showEmojis = ref(false);
const loading = ref(false);
const selectedImage = ref("");
const profileImage = ref("");
const blob = ref("");
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

watchEffect(() => {
    token.value = authStore.userToken;
})
const config = {
    headers: {
        Authorization: `Bearer ${token.value}`
    }
};

const getCredentials = async () => {
    const response = await axios.get(credentials, config);
    profileImage.value = response.data.profilePicture;
};
getCredentials();

async function sendPost() {
    loading.value = true;
    let sentImage;
    const imageReference = storageRef(storage, `images/${new Date().getTime()} - ${selectedImage.name}`);
    const snap = await uploadBytes(imageReference, selectedImage.value);
    const downloadImageUrl = await getDownloadURL(storageRef(storage, snap.ref.fullPath));
    sentImage = downloadImageUrl;

    await axios.post(postCreateUrl, {
        image: sentImage,
        description: inputEl.value
    }, config)
    loading.value = false;
    setTimeout(() => {
        inputEl.value = "";
        selectedImage.value = "";
    }, 1000);
};
</script>
<template>
    <div
        :class="[loading ? ' rounded-md flex overflow-y-scroll scrollbar-hide border-b dark:border-gray-800 border-gray-300 p-3 space-x-3 opacity-60 bg-[#F3F4F6] dark:bg-[#193A5E]' : 'rounded-md bg-[#F3F4F6] dark:bg-[#193A5E] flex overflow-y-scroll scrollbar-hide border-b dark:border-gray-600 border-gray-300 p-3 space-x-3']">
        <div>
            <img :src="profileImage" class="h-11 w-11 rounded-full mr-4" />
        </div>
        <div class="w-full">
            <div>
                <textarea v-model="inputEl" placeholder="What's happening?"
                    class="w-full min-h-[52px] text-lg tracking-wide bg-transparent outline-none placeholder-gray-500 dark:placeholder-gray-400 dark:text-white text-black" />
                <div v-if="selectedImage">
                    <div class="relative">
                        <div
                            class="absolute w-8 h-8 bg-black bg-opacity-75 hover:bg-gray-800 rounded-full cursor-pointer flex items-center justify-center top-1 left-1">
                            <XMarkIcon @click="removeSelectedImage()" class="h-5 w-5 text-white" />
                        </div>
                        <img :src="blob" alt="image" width="200" height="200">
                    </div>
                </div>
            </div>

            <div v-if="!loading">
                <div class="flex justify-between items-center pt-2">
                    <div class="flex-center space-x-6">
                        <div>
                            <label for="fileUpload">
                                <div class="icon-style">
                                    <PhotoIcon class="text-green-600 h-[22px]" />
                                    <p class="dark:text-white">Photo</p>
                                </div>
                            </label>
                            <input type="file" @change="fileUpload" hidden name="fileUpload" id="fileUpload"
                                accept="image/*" />
                        </div>

                        <div class="icon-style">
                            <ChartBarIcon class="text-orange-600 h-[22px]" />
                            <p class="dark:text-white">Chart</p>
                        </div>

                        <div class="icon-style" @click="showEmojis = !showEmojis">
                            <FaceSmileIcon class="text-yellow-600 h-[22px]" />
                            <p class="dark:text-white">Emoji</p>
                        </div>

                        <div class="icon-style">
                            <VideoCameraIcon class="text-[#1d9bf0] h-[22px]" />
                            <p class="dark:text-white">Video</p>
                        </div>

                        <div v-if="showEmojis" class="absolute top-44">
                            <EmojiPicker @select="showEmoji" />
                        </div>
                    </div>
                    <div>
                        <button :disabled="!inputEl"
                            class="bg-[#1d9bf0] text-white rounded-full shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default px-4 py-1.5 font-bold"
                            @click="sendPost()">Post</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>