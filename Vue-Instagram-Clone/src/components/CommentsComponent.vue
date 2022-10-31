<script setup>
const props = defineProps({
    id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    time: {
        type: Object
    }
})
</script>
<template>
    <main class="flex-between">
        <div class="flex justify-center items-center">
            <img :src="props.profile" :alt="props.username" class="w-6 h-6 rounded-full" />
            <div class="flex items-center ml-1 space-x-2 md:space-x-4 lg:ml-2">
                <h4 class="font-bold text-xs md:text-base">{{ props.username }}</h4>
                <p class="text-xs md:text-base">{{ props.comment }}</p>
            </div>
        </div>

        <div class="text-xs lg:mr-1" v-if="props.time">
            <timeago :datetime="props.time?.toDate()" :auto-update="60"></timeago>
        </div>
    </main>
</template>