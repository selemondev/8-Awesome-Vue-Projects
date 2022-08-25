<script setup>
import axios from "../Axios/axios";
import { ref } from "vue";
const baseURL = "https://image.tmdb.org/t/p/original/";
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    fetchUrl: {
        type: String,
        required: true
    }
});
const movies = ref([]);
const fetchMovies = async () => {
    const response = await axios.get(props.fetchUrl);
    response.data.results.forEach((movie) => {
        movies.value.push(movie)
    });
};
fetchMovies()
</script>
<template>
    <div>
        <div class="pb-4 pt-4 pl-3 md:pt-10">
            <h2 class="text-white font-bold text-lg md:text-2xl">{{ props.title }}</h2>
        </div>
        <div class="flex items-center overflow-y-hidden scrollbar-hide overflow-x-scroll">
            <div v-for="movie in movies" :key="movie.id">
                <div class="group relative min-w-[180px] md:min-w-[200px]">
                    <router-link :to="{ name: 'movie', params:{ id: movie.id}}">
                        <img :src="`${baseURL}${movie.poster_path}`" :alt="`${movie.name}`"
                            class="h-52 min-w-[180px] m-2 md:h-64 md:min-w-[200px] relative">
                        <div
                            class="absolute left-0 right-0 bottom-0 m-2 min-w-[180px] h-0 flex flex-col bg-black/60 opacity-0 group-hover:h-52 group-hover:opacity-100 duration-500 md:min-w-[200px] md:group-hover:h-64">
                            <div class="px-2 pt-2 space-y-2 cursor-pointer md:pt-6">
                                <h1 class="text-base text-white md:text-xl">{{ movie.title || movie.name }}</h1>
                                <p class="line-clamp-6 text-sm text-gray-300">{{ movie.overview }}</p>
                                <h4 class="text-white">Vote Average: <span
                                        :class="[movie.vote_average > 5 ? 'text-green-500 font-bold' : 'text-red-500 font-bold']">{{
                                                movie.vote_average.toFixed(1)
                                        }}</span></h4>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>