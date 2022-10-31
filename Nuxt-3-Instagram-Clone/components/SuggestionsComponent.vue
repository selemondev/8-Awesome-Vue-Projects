<script setup>
import { faker } from "@faker-js/faker";
import { ref } from "vue";
const userSuggestions = ref([]);
const createRandomUsers = () => {
    return {
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        avatar: faker.image.avatar(),
    }
};
Array.from({ length: 20 }).forEach(() => {
    userSuggestions.value.push(createRandomUsers());
});
</script>

<template>
    <div class="py-6 px-6 ml-1 mt-6 rounded-md border border-gray-200 w-96 dark:border-none dark:bg-gray-800">
        <div>
            <SuggestionProfileImageComponent />
        </div>
        <div class="mt-5 flex-between">
            <p class="font-bold text-gray-400 text-base">Suggestions For You</p>
            <p class="dark:text-white cursor-pointer">See All</p>
        </div>

        <div v-for="suggestion in userSuggestions" :key="suggestion.userId" class="mt-4 space-y-12">
            <SuggestionComponent
            :id="suggestion.userId"
            :username="suggestion.username"
            :avatar="suggestion.avatar"
            />
        </div>
    </div>
</template>