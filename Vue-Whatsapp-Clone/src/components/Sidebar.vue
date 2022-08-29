<script setup>
const props = defineProps({
    userId: {
        type: String
    },
    username: {
        type: String
    },
    avatar: {
        type: String
    }
});
console.log("Id : ", props.userId)
console.log("Username : ", props.username);
console.log("Avatar : ", props.avatar);
</script>
<template>
    <div>
        <div @click="$emit('changeChat', props.id, props.username, props.avatar)" class="space-x-3 flex-center bg-grey-light cursor-pointer my-2 hover:bg-gray-200/70 md:px-2 md:py-1">
            <div>
                <img class="h-12 w-12 rounded-full m-2 lg:m-0"
                    :src="props.avatar" />
            </div>
            <div class="ml-4 flex-1 py-4 md:border-b md:border-grey-lighter lg:block">
                <div class="flex items-bottom justify-between">
                    <p class="hidden text-grey-darkest md:block">
                       {{props.username}}
                    </p>
                    <p class="hidden text-xs text-grey-darkest lg:block">
                        12:45 pm
                    </p>
                </div>
                <p class="hidden text-grey-dark mt-1 text-sm lg:block">
                    Get Andrés on this movie ASAP!
                </p>
            </div>
        </div>
    </div>
</template>