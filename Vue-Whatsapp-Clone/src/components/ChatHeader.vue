<script setup>
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
    <div class="flex items-center">
        <div v-if="props.chatAvatar">
            <img class="w-10 h-10 rounded-full" :src="props.chatAvatar" />
        </div>
        <div class="ml-4">
            <p class="text-grey-darkest dark:text-white">
                {{ props.chatUsername }}
            </p>
            <p v-if="props.chatOnline" class="hidden text-grey-darker text-xs mt-1 md:block dark:text-gray-300">
               Online
            </p>
            <p v-else class="hidden text-grey-darker text-xs mt-1 md:block">
            <div v-if="props.chatTimestamp" class="flex-center space-x-1">
               <p class="dark:text-gray-300">Last seen</p>
                <span class="dark:text-gray-300"><timeago :datetime="props.chatTimestamp?.toDate()" :auto-update="60"></timeago></span>
            </div>
            </p>
        </div>
    </div>
</template>