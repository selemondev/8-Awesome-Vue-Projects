<script setup>
import FeedStory from "../components/FeedStory.vue";
import { ref } from "vue";
import { faker } from '@faker-js/faker';
import { Icon } from "@iconify/vue";
const stories = ref([]);
function createRandomUser() {
    return {
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
    };
}
Array.from({ length: 8 }).forEach(() => {
    stories.value.push(createRandomUser());
});
</script>
<template>
    <main class="flex-grow max-w-2xl sm:ml-[73px] xl:ml-[370px]">
        <div class="flex space-x-3 p-6 mt-12 rounded-sm overflow-x-scroll scrollbar-hide lg:mt-14">
            <div class="px-4 grid-layout rounded-md h-16 w-16 bg-gray-200 dark:bg-[#18314d]">
                <div class="grid-layout rounded-md bg-[#145CEB] h-6 w-6">
                    <Icon icon="ic:baseline-plus" class="text-white"/>
                </div>
            </div>

            <div v-for="story in stories" :key="story.id">
                <FeedStory :id="story.userId" :image="story.avatar" :username="story.username" />
            </div>
        </div>
    </main>
</template>