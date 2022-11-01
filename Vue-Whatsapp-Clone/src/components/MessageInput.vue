<script setup>
import { FaceSmileIcon, PaperClipIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import Loader from "./Loader.vue";
import { PaperAirplaneIcon } from "@heroicons/vue/24/solid";
import { storage, db } from "../firebaseConfig";
import { addDoc, collection, setDoc, doc, Timestamp } from "@firebase/firestore";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import EmojiPicker from "vue3-emoji-picker";
import "../../node_modules/vue3-emoji-picker/dist/style.css";
import { ref } from "vue";
const inputEl = ref("");
const showEmojis = ref(false);
const loading = ref(false);
const selectedImage = ref("");
const blob = ref("")
const selectedUser = ref("");
const currentUser = ref("")
const props = defineProps({
    contactId: {
        type: String,
    },
    currentUserId: {
        type: String
    }
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

const handleSubmit = async () => {
    selectedUser.value = props.contactId;
    currentUser.value = props.currentUserId;
    const id = currentUser.value > selectedUser.value ? `${currentUser.value + selectedUser.value}` : `${selectedUser.value + currentUser.value}`;
    let sentImage;
    loading.value = true;
    if (selectedImage.value) {
        const imageReference = storageRef(storage, `images/${new Date().getTime()}`);
        const snap = await uploadBytes(imageReference, selectedImage.value);
        const downloadImageUrl = await getDownloadURL(storageRef(storage, snap.ref.fullPath));
        sentImage = downloadImageUrl;
    }
    await addDoc(collection(db, "messages", id, "chat"), {
        text: inputEl.value,
        from: props.currentUserId,
        to: selectedUser.value,
        createdAt: Timestamp.fromDate(new Date()),
        media: sentImage || ""
    });
    loading.value = false;

    await setDoc(doc(db, "lastMessage", id), {
        text: inputEl.value,
        from: props.currentUserId,
        to: selectedUser.value,
        createdAt: Timestamp.fromDate(new Date()),
        unread: true
    });

    setTimeout(() => {
        selectedImage.value = "";
        inputEl.value = "";
    })
}
</script>
<template>
    <div>
        <div v-if="selectedImage" class="grid-center">
            <div class="relative my-2">
                <div
                    class="absolute w-8 h-8 bg-black bg-opacity-75 hover:bg-gray-800 rounded-full cursor-pointer flex items-center justify-center top-1 left-1">
                    <XMarkIcon @click="removeSelectedImage()" class="h-5 w-5 text-white" />
                </div>
                <img :src="blob" alt="image" width="200" height="200">
            </div>
        </div>
        <form @submit.prevent="handleSubmit" class="bg-grey-lighter px-4 flex items-center"
            :class="[ selectedImage ? 'py-0' : 'py-4']">
            <div class="flex-center space-x-1 cursor-pointer md:space-x-2">
                <FaceSmileIcon @click="showEmojis = !showEmojis" class="w-4 h-4 text-white md:w-6 md:h-6" />
                <label for="fileUpload">
                    <PaperClipIcon class="w-4 h-4 text-white md:w-6 md:h-6" />
                    <input type="file" @change="fileUpload" hidden name="fileUpload" id="fileUpload" accept="image/*" />
                </label>
            </div>
            <div v-if="showEmojis" class="absolute top-[200px]">
                <EmojiPicker @select="showEmoji" />
            </div>
            <div class="flex-1 mx-2">
                <input class="input-style" placeholder="Type a message.." v-model="inputEl" />
            </div>

            <div>
                <button :disabled="!inputEl" type="submit"
                    class="py-1 px-2 rounded-full bg-green-500 disabled:opacity-60 hover:bg-green-600 transition duration-200 ease-in md:py-4 md:px-4">
                    <span v-if="loading">
                        <Loader />
                    </span>
                    <span v-else>
                        <PaperAirplaneIcon class="w-4 h-4 text-white md:w-6 md:h-6" />
                    </span>
                </button>
            </div>
        </form>
    </div>
</template>