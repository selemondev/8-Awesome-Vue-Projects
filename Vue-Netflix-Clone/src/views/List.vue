<script setup>
import { ref, watchEffect } from "vue";
import { useMovieStore } from "../stores/movieStore";
import Navbar from '../components/Navbar.vue';
const movieStore = useMovieStore();
const listMovies = ref([]);
const baseURL = "https://image.tmdb.org/t/p/original/";
watchEffect(() => {
    listMovies.value = movieStore.movies;
});
</script>
<template>
    <div>
        <Navbar />
        <div class="flex items-center flex-wrap pt-16">
            <div v-for="movie in listMovies" :key="movie.id" class="m-1 md:m-2">
                <router-link :to="{ name: 'movie', params: { id: movie.id } }">
                    <img :src="`${baseURL}${movie?.backdrop_path || movie?.poster_path}`" :alt="movie?.title"
                        class="h-32 w-32 p-2 md:h-48 md:w-[250px]">
                </router-link>
                <div class="text-center">
                    <p class="text-white font-bold line-clamp-1 text-sm md:text-base">{{ movie?.title || movie?.original_title ||
                            movie?.original_name
                    }}</p>
                </div>
            </div>
        </div>
    </div>
</template>