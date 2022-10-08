<script setup>
import Placeholder from "../assets/Placeholder.png";
const props = defineProps({
    chatAvatar: {
        type: String,
    },
    chatUsername: {
        type: String
    },
    chatTimestamp: {
        type: Object
    },
    chatOnline: {
        type: Boolean
    }
});
</script>
<template>
    <div class="flex-center">
        <div v-if="props.chatAvatar">
            <img class="w-10 h-10 rounded-full" :src="props.chatAvatar" />
        </div>

        <div v-else>
            <img class="w-10 h-10 rounded-full" :src="Placeholder" />
        </div>
        <div class="ml-4">
            <p class="text-white">
                {{ props.chatUsername }}
            </p>
            <p v-if="props.chatOnline" class="hidden text-xs mt-1 md:block text-gray-300">
               Online
            </p>
            <p v-else class="hidden text-grey-darker text-xs mt-1 md:block">
            <div v-if="props.chatTimestamp" class="flex-center space-x-1">
               <p class="text-gray-300">Last seen</p>
                <span class="text-gray-300"><timeago :datetime="props.chatTimestamp?.toDate()" :auto-update="60"></timeago></span>
            </div>
            </p>
        </div>
    </div>
</template>