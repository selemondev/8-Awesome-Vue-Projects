<script setup>
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { ref, watchEffect } from 'vue';
import Placeholder from "../assets/Placeholder.png";
const lastMessage = ref([]);
const props = defineProps({
    active: {
        type: Boolean
    },
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

const stopRunning = watchEffect(() => {
    const id = props.currentUserId > props.userId ? `${props.currentUserId + props.userId}` : `${props.userId + props.currentUserId}`;
    let unsubscribe = onSnapshot(doc(db, "lastMessage", id), (doc) => {
        lastMessage.value = { ...doc.data(), id: doc.id };
    });
    return () => unsubscribe();
});
stopRunning();
</script>
<template>
    <div @click="$emit('changeChat', props.id, props.username, props.avatar, props.contact)"
        class="space-x-3 flex-center bg-grey-light cursor-pointer my-2 hover:bg-gray-800 md:px-2 md:py-1">
        <div v-if="props.avatar" class="relative">
            <img v-if="props.avatar" class="h-12 w-12 rounded-full m-2 lg:m-0" :src="props.avatar"
                :alt="props.username" />
            <span v-if="props.active" class="bottom-0 left-8 absolute  w-3.5 h-3.5 bg-green-400 rounded-full"></span>
            <span v-else class="bottom-0 left-8 absolute w-3.5 h-3.5 bg-red-400 rounded-full"></span>
        </div>

        <div v-else>
            <img class="h-12 w-12 rounded-full m-2 lg:m-0" :src="Placeholder" :alt="props.username" />
        </div>

        <div class="ml-4 flex-1 py-4 border-b border-gray-800 lg:block">
            <div class="flex items-bottom justify-between">
                <p class="hidden md:block text-white">
                    {{ props.username }}
                </p>
                <p class="hidden text-xs text-grey-darkest lg:block">
                    <span v-if="lastMessage?.createdAt" class="text-gray-300">
                        <timeago :datetime="lastMessage.createdAt?.toDate()" :auto-update="60"></timeago>
                    </span>
                </p>
            </div>
            <div class="hidden mt-1 md:block">
                <div v-if="lastMessage?.text" class="flex-between">
                    <div class="flex-center space-x-2">
                        <p v-if="lastMessage.from === currentUserId" class="text-gray-200">Me: </p>
                        <p class="text-sm text-gray-300"> {{ lastMessage?.text }}</p>
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