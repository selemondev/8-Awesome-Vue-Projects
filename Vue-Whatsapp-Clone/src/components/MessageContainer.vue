<script setup>
import { ref, watchEffect } from "vue";
const scrollRef = ref(null);
watchEffect(() => {
    scrollRef.value?.scrollIntoView({behavior: "smooth" })
})
const props = defineProps({
    messages: {
        type: Object
    },
    currentUserId: {
        type: String
    }
});
</script>
<template>
    <div class="py-2 px-3">
        <div :class="[messages.from === props.currentUserId ? 'flex justify-end mb-2' : '']"  ref="scrollRef">
            <div class="inline-block max-w-md text-left" :class="[messages.from === props.currentUserId ? 'rounded py-2 px-3 bg-[#E2F7CB] max-w-md' : 'bg-white rounded-md py-2 px-3']">
                <p class="text-sm mt-1">
                    {{ messages.text }}
                </p>
                <p v-if="messages.createdAt" class="text-right text-xs text-gray-500 mt-1">
                    <timeago :datetime="messages.createdAt?.toDate()" :auto-update="60"></timeago>
                </p>
            </div>
        </div>
    </div>
</template>