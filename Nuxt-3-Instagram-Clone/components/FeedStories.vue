<script setup lang="ts">
import { faker } from "@faker-js/faker";
import { ref } from "vue";
const stories = ref([]);
const createRandomUsers = () => {
    return {
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
    }
};
Array.from({ length: 20 }).forEach(() => {
    stories.value.push(createRandomUsers());
});
</script>
<template>
    <div class="flex space-x-2 p-6 bg-white border border-gray-200 mt-8 rounded-sm overflow-x-scroll dark:bg-gray-800 dark:text-white dark:border-none lg:scrollbar-hide lg:mt-10">
        <div v-for="story in stories" :key="story.userId">
            <FeedStory
            :userId="story.userId"
            :username="story.username"
            :avatar="story.avatar"
             />
        </div>
    </div>
</template>