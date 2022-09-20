<script setup>
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { ref, watchEffect } from 'vue';
const lastMessage = ref([]);
const props = defineProps({
    currentUserId: {
        type: String
    },
    userId: {
        type: String
    },
    username: {
        type: String
    },
    avatar: {
        type: String
    },
    contact: {
        type: Object
    }
});

watchEffect(() => {
    const id = props.currentUserId > props.userId ? `${props.currentUserId + props.userId}` : `${props.userId + props.currentUserId}`;
    let unsubscribe = onSnapshot(doc(db, "lastMessage", id), (doc) => {
        lastMessage.value = {...doc.data(), id: doc.id };
    });
    return () => unsubscribe();
})
</script>
<template>
    <div @click="$emit('changeChat', props.id, props.username, props.avatar, props.contact)"
        class="space-x-3 flex-center bg-grey-light cursor-pointer my-2 hover:bg-gray-200/70 dark:hover:bg-gray-800 md:px-2 md:py-1">
        <div v-if="props.avatar">
            <img class="h-12 w-12 rounded-full m-2 lg:m-0" :src="props.avatar" :alt="props.username" />
        </div>

        <div class="ml-4 flex-1 py-4 md:border-b md:border-grey-lighter dark:border-b dark:border-gray-800 lg:block">
            <div class="flex items-bottom justify-between">
                <p class="hidden text-grey-darkest md:block dark:text-white">
                    {{ props.username }}
                </p>
                <p class="hidden text-xs text-grey-darkest lg:block">
                    <span v-if="lastMessage?.createdAt" class="dark:text-gray-300">
                        <timeago :datetime="lastMessage.createdAt?.toDate()" :auto-update="60"></timeago>
                    </span>
                </p>
            </div>
            <div class="hidden mt-1 lg:block">
                <div v-if="lastMessage?.text" class="flex-between">
                    <div class="flex-center space-x-2">
                        <p v-if="lastMessage.from === currentUserId" class="dark:text-gray-200">Me: </p>
                        <p class="text-sm dark:text-gray-300"> {{ lastMessage?.text }}</p>
                    </div>
                    <p v-if="lastMessage?.unread && lastMessage?.from !== currentUserId">
                        <p class="w-4 h-4 pt-.5 text-white bg-green-500 rounded-full text-center text-xs">1</p>
                    </p>

                    <p v-else>
                        <span>
                            <p><i class="fa fa-check-double text-blue-500"></i></p>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>