<script setup>
import { collection, addDoc, setDoc, doc, serverTimestamp, orderBy, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Icon } from "@iconify/vue";
import { auth } from "../firebaseConfig";
import { ref, watchEffect } from "vue";
import CommentsComponent from './CommentsComponent.vue';
import { useAuthStore } from "../stores/authStore";
const authStore = useAuthStore();
const username = ref("");
const profileImage = ref("");
username.value = authStore.username;
profileImage.value = authStore.userImage;
const comment = ref("");
const comments = ref([]);
const isLiked = ref(false);
const likes = ref([]);
const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    media: {
        type: String,
    },
    timeStamp: {
        type: Object
    }
});
const postComments = async () => {
    await addDoc(collection(db, "posts", props.id, "comments"), {
        id: auth.currentUser?.uid,
        username: username.value,
        profile: profileImage.value,
        comment: comment.value,
        timeStamp: serverTimestamp()
    });
    setTimeout(() => {
        comment.value = "";
    }, 1000)
};
// comments
watchEffect(() => {
    const commentRef = collection(db, "posts", props.id, "comments");
    const q = query(commentRef, orderBy("timeStamp", "desc"));
    const unsubscribe = onSnapshot(q, querySnapshot => {
        let commentsData = [];
        querySnapshot.forEach(doc => {
            commentsData.push({ ...doc.data(), id: doc.id })
        });
        comments.value = commentsData;
    });
    return () => unsubscribe();
});
watchEffect(() => {
    const likesRef = collection(db, "posts", props.id, "likes");
    const q = query(likesRef);
    const unsubscribe = onSnapshot(q, querySnapshot => {
        let postLikes = [];
        querySnapshot.forEach(doc => {
            postLikes.push({ ...doc.data(), id: doc.id });
        });
        likes.value = postLikes;
    });
    return () => unsubscribe();
});
watchEffect(() => {
    isLiked.value = likes.value.findIndex((post) => post.id === auth.currentUser.uid) !== -1;
})
// like functionality
const likePost = async () => {
    await setDoc(doc(db, "posts", props.id, "likes", auth?.currentUser?.uid), {
        username: props.username
    })
};
</script>
<template>
    <main>
        <div class="bg-white my-6 border border-gray-200 rounded-md dark:bg-gray-800 dark:border-none dark:text-white">
            <div
                class="flex justify-between items-center p-2 border-b border-gray-200 dark:border-b dark:border-gray-700">
                <div class="flex items-center">
                    <img :src="props.profile" alt="Image" class="h-10 w-10 rounded-full">
                    <h4 class="font-bold pl-3">{{ props.username }}</h4>
                </div>
                <Icon icon="mdi:dots-horizontal" class="h-6 w-6 text-gray-500" />
            </div>
            <div class="grid-center w-full" v-if="props?.media">
                <img :src="props.media" :alt="props.username" class="w-full object-cover">
            </div>

            <div class="flex justify-between pt-3 px-3">
                <div class="flex space-x-4">
                    <div>
                        <div v-if="isLiked" class="text-red-500" @click="likePost()">
                            <Icon icon="mdi:cards-heart" class="icon-style" />
                        </div>
                        <div v-else @click="likePost()">
                            <Icon icon="mdi:cards-heart-outline" class="icon-style" />
                        </div>
                    </div>
                    <div>
                        <Icon icon="ri:chat-3-line" class="icon-style" />
                    </div>
                    <div>
                        <Icon icon="pajamas:paper-airplane" class="icon-style" />
                    </div>
                </div>
                <div>
                    <Icon icon="material-symbols:bookmark-outline-sharp" class="icon-style" />
                </div>
            </div>
            <div>
                <div class="px-4 py-2 truncate">
                    <div v-if="likes.length > 0">
                        <p class="font-bold">{{ likes.length }} likes</p>
                    </div>
                    <div class="flex items-center mt-2">
                        <p class="mr-3 font-bold">{{ props.username }}</p>
                        <p class="truncate">{{ props.text }}</p>
                    </div>
                </div>
            </div>
            <!-- comments -->
            <div class="overflow-y-scroll max-h-20 mb-4 ml-4 scrollbar-thin">
                <div class="items-center mb-2 space-x-2" v-for="comment in comments" :key="comment.id">
                    <CommentsComponent :id="comment.id" :profile="comment.profile" :username="comment.username"
                        :comment="comment.comment" :time="comment.timeStamp" />
                </div>
            </div>
            <div class="ml-4 text-gray-400 text-xs lg:text-base font-bold" v-if="props?.timeStamp">
                <timeago :datetime="props.timeStamp?.toDate()" :auto-update="60"></timeago>
            </div>
            <!-- comment input -->
            <div class="flex-between p-2">
                <div class="flex items-center space-x-2">
                    <div>
                        <Icon icon="ph:smiley" class="w-7 h-7" />
                    </div>
                    <div>
                        <input type="text" placeholder="Add a comment.."
                            class="py-2 px-2 w-full appearance-none focus:outline-none rounded-md bg-white dark:placeholder-gray-400 dark:bg-gray-600"
                            v-model="comment">
                    </div>
                </div>
                <div>
                    <button :disabled="!comment"
                        class="bg-[#F14651] text-white rounded-full shadow-md hover:bg-[#F14651] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default py-1.5 px-4 font-bold"
                        @click="postComments()">Post</button>
                </div>
            </div>
        </div>
    </main>
</template>