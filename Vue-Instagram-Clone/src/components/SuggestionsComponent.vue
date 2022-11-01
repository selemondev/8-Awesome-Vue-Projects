<script setup>
import { faker } from "@faker-js/faker";
import SuggestionComponent from "../components/SuggestionComponent.vue";
import SuggestionProfileImageComponent from "./SuggestionProfileImageComponent.vue";
import { ref, watchEffect } from "vue";
const userSuggestions = ref([]);
const scrolled = ref(false);
const handleScroll = () => {
    if (scrollY > 0) {
        scrolled.value = true;
    } else {
        scrolled.value = false;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll)
};

watchEffect(() => {
    handleScroll();
})
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
    <div :class="[scrolled ? 'py-6 px-6 ml-1 rounded-md border border-gray-200 w-96 dark:border-none dark:bg-gray-800' : 'py-6 px-6 ml-1 mt-[27px] rounded-md border border-gray-200 w-96 dark:border-none dark:bg-gray-800']">
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