<script setup>
import { FaceSmileIcon, PaperClipIcon, XMarkIcon } from "@heroicons/vue/24/outline";
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

    await addDoc(collection(db, "messages", id, "chat"), {
        text: inputEl.value,
        from: props.currentUserId,
        to: selectedUser.value,
        createdAt: Timestamp.fromDate(new Date()),
    });

    await setDoc(doc(db, "lastMessage", id), {
        text: inputEl.value,
        from: props.currentUserId,
        to: selectedUser.value,
        createdAt: Timestamp.fromDate(new Date()),
        unread: true
    });

    inputEl.value = "";
}
</script>
<template>
    <div>
        <form @submit.prevent="handleSubmit" class="bg-grey-lighter px-4 py-4 flex items-center">
            <div class="flex-center space-x-1 cursor-pointer md:space-x-2">
                <FaceSmileIcon @click="showEmojis = !showEmojis" class="w-4 h-4 md:w-6 md:h-6 dark:text-white" />
                <label for="fileUpload">
                    <PaperClipIcon class="w-4 h-4 md:w-6 md:h-6 dark:text-white" />
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
                <button type="submit"
                    class="py-1 px-2 rounded-full bg-green-500 hover:bg-green-600 transition duration-200 ease-in md:py-4 md:px-4">
                    <PaperAirplaneIcon class="w-4 h-4 text-white md:w-6 md:h-6" />
                </button>
            </div>
        </form>
    </div>
</template>