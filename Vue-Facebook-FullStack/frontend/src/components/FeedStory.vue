<script setup>
const props = defineProps({
    id: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
})
</script>
<template>
    <main>
        <div>
            <img :src="props.image" :alt="props.username"
                class="w-14 h-14 hover:scale-105 ease-in duration-200 rounded-full object-contain p-1 border-2 border-[#145CEB] cursor-pointer">
            <p class="text-center w-12 text-xs dark:text-white truncate mt-2">{{ props.username }}</p>
        </div>
    </main>
</template>