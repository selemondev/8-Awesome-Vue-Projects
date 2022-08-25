<script setup>
import Axios from "../axios/axios";
import requests from "../requests/requests";
import { PlayIcon, ExclamationCircleIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";
const selectedMovie = ref([]);
const baseURL = "https://image.tmdb.org/t/p/original/";
const movies = ref([]);
const fetchRandomMovie = async () => {
    const response = await Axios.get(requests.fetchTrending);
    movies.value = response.data.results;
    selectedMovie.value = movies.value[Math.floor(Math.random() * movies.value.length - 1)];
};
fetchRandomMovie()
</script>
<template>
    <div class="flex flex-col space-y-2 pt-28 pb-32 md:pb-32 md:pt-32">
        <div class="absolute top-0 left-0 -z-10 h-[95vh] w-full">
            <img :src="`${baseURL}${selectedMovie?.backdrop_path || selectedMovie?.poster_path}`"
                class="w-full h-96 object-cover lg:h-full" />
        </div>

        <div class="px-4 md:pb-4">
            <h2 class="text-white text-2xl md:text-5xl">{{ selectedMovie?.name || selectedMovie?.original_ ||
                    selectedMovie?.title ||
                    selectedMovie?.original_title
            }}</h2>
        </div>

        <div class="max-w-xs text-xs line-clamp-5 text-shadow-md px-4 md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
            <h4 class="text-white">{{ selectedMovie.overview }}....</h4>
        </div>

        <div class="flex space-x-3 pt-2 px-4 md:pt-1">
                <button class="btn bg-white text-black hover:bg-red-600">
                    <PlayIcon class="w-5 h-5 md:w-8 md:h-8" />
                    Play
                </button>
            <button class="btn bg-[gray]/90 hover:bg-gray-500">
                <ExclamationCircleIcon class="w-6 h-6 md:w-8 md:h-8" />
                More Info
            </button>
        </div>
    </div>
</template>