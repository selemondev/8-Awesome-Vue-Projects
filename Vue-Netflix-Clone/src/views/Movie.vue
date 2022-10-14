<script>
import { defineComponent, ref, watchEffect } from 'vue';
import { YoutubeVue3 } from 'youtube-vue3';
import axios from "../Axios/axios";
import movieTrailer from "movie-trailer";
import { useToast } from "vue-toastification";
import { useRoute } from 'vue-router';
import { useMovieStore } from "@/stores/movieStore";
import { PlayIcon, PauseIcon, PlusIcon, CheckIcon, XMarkIcon, ArrowLeftIcon } from '@heroicons/vue/24/solid';
const API_KEY = import.meta.env.VITE_API_KEY;
export default defineComponent({
    components: {
        YoutubeVue3,
        PlayIcon,
        PauseIcon,
        PlusIcon,
        CheckIcon,
        XMarkIcon,
        ArrowLeftIcon
    },
    data() {
        return {
            play: false,
        }
    },
    setup() {
        const movieStore = useMovieStore();
        const movieExists = ref(false);
        watchEffect(() => {
            movieExists.value = movieStore.movieExists;
        });
        const route = useRoute();
        const params = route.params.id;
        const toast = useToast();
        const movie = ref([]);
        const trailer = ref("");
        const open = ref(false);
        const baseURL = "https://image.tmdb.org/t/p/original/";
        const searchMovieUrl = `https://api.themoviedb.org/3/movie/${params}?api_key=${API_KEY}&language=en-US`;
        const getMovie = async () => {
            const response = await axios.get(searchMovieUrl);
            movie.value = response.data;
        };
        getMovie();
        const watchTrailer = async (movie) => {
            open.value = true;
            movieTrailer(null, { tmdbId: movie.id })
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    trailer.value = urlParams.get("v");
                })
                .catch((error) => console.log(error));
        };
        const handleAddToStore = (movie) => {
            movieStore.addMovie(movie);
            toast.success("Movie added to your list", {
                timeout: 3000,
            })
        };
        const handleRemoveFromStore = (movie) => {
            movieStore.removeMovie(movie)
            toast.error("Movie removed from your list", {
                timeout: 3000,
            });
        }
        return {
            movie,
            baseURL,
            trailer,
            watchTrailer,
            handleAddToStore,
            handleRemoveFromStore,
            movieStore,
            open,
            movieExists,
        }
    },
    methods: {
        playCurrentVideo() {
            this.$refs.youtube.player.playVideo();
            this.play = true;
        },
        pauseCurrentVideo() {
            this.$refs.youtube.player.pauseVideo();
            this.play = false;
        },
    }
})
</script>
<template>
    <div class="w-full min-h-screen">
        <div class="absolute top-0 bottom-0 -z-10 w-full">
            <img :src="`${baseURL}${movie?.backdrop_path}`" class="w-full h-full object-cover" />
        </div>
        <div class="p-4">
            <router-link to="/">
                <button class="btn bg-red-500/40 hover:bg-red-500">
                    <ArrowLeftIcon class="w-6 h-6" />
                    Back
                </button>
            </router-link>
        </div>
        <div>
            <Teleport to="#modal">
                <div class="fixed z-999 top-4 left-2 md:top-64 md:left-[15%] lg:top-10 lg:left-[25%]" v-if="open">
                    <div class="h-[500px] bg-black w-[300px] relative sm:w-[500px] md:w-[600px]">
                        <div class="relative">
                            <div
                                class="absolute w-8 h-8 bg-black hover:bg-gray-800 transition duration-200 ease-in rounded-full cursor-pointer flex justify-center items-center text-white top-1 right-1">
                                <XMarkIcon @click="open = false"
                                    class="w-4 h-4 hover:w-6 hover:h-6 hover:transition hover:duration-200 hover:ease-in text-white" />
                            </div>
                            <YoutubeVue3 ref="youtube" :videoid="trailer" class="w-[300px] md:h-[300px] md:w-[600px]" />
                            <div class="pl-4 pt-1 md:pt-3">
                                <div class="flex items-center mt-2 space-x-4">
                                    <div v-if="!play">
                                        <button @click="playCurrentVideo()"
                                            class="py-1 px-3 flex-center rounded-sm bg-white hover:bg-gray-200 transition duration-200 ease-in items-center text-black space-x-2">
                                            <PlayIcon class="icon-style text-black" />
                                            <span class="font-bold text-base md:text-xl">Play</span>
                                        </button>
                                    </div>
                                    <div v-if="play">
                                        <button @click="pauseCurrentVideo()"
                                            class="py-1 px-3 flex-center rounded-sm bg-white hover:bg-gray-200 transition duration-200 ease-in items-center text-black space-x-2">
                                            <PauseIcon class="icon-style text-black" />
                                            <span class="font-bold text-base md:text-xl">Pause</span>
                                        </button>
                                    </div>
                                    <div>
                                        <div v-if="!movieExists">
                                            <div @click="handleAddToStore(movie)"
                                                class="w-8 h-8 border border-gray-200 hover:text-gray-200 rounded-full cursor-pointer flex items-center text-white justify-center">
                                                <PlusIcon class="icon-style text-white" />
                                                <p class="hidden">{{ movieStore.MoviesExist(movie) }}</p>
                                            </div>
                                        </div>
                                        <div v-if="movieExists">
                                            <div @click="handleRemoveFromStore(movie)"
                                                class="w-8 h-8 border border-green-500 hover:text-green-200 rounded-full cursor-pointer flex items-center text-green-500 justify-center">
                                                <CheckIcon class="icon-style text-green-500" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="pl-4 py-4 space-y-2 h-[140px] overflow-y-auto">
                            <div>
                                <p class="text-gray-300">
                                    Rating:
                                    <span :class="[movie.vote_average > 5 ? 'text-green-500' : 'text-red-500']">{{
                                            movie?.vote_average.toFixed(0)
                                    }}</span>
                                </p>
                            </div>
                            <div>
                                <p class="text-gray-300">{{ movie.overview }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Teleport>
        </div>
        <div class="grid place-items-start pt-14 md:pt-10">
            <div
                class=" bg-black rounded-md md:ml-2 bg-opacity-20 backdrop-blur-xl w-80 h-96 pt-10 flex justify-around items-center md:w-[800px] md:justify-center">
                <div class="md:w-72 w-32">
                    <img :src="`${baseURL}${movie?.poster_path}`" :alt="`${movie.title}`" class="w-62 h-72 md:ml-2">
                </div>
                <div class="md:w-96 w-32 h-72 md:-ml-5 overflow-y-scroll md:overflow-hidden">
                    <h2 class="font-bold md:text-3xl mb-2 text-white">{{ movie.title }}</h2>
                    <p class="text-white line-clamp-4">- {{ movie.overview }}</p>
                    <div>
                        <button @click="watchTrailer(movie)"
                            class="py-1.5 px-3 rounded-sm mt-5 bg-white hover:bg-gray-200 transition duration-200 ease-in flex-center text-black space-x-2 md:space-x-3">
                            <PlayIcon class="icon-style text-black" />
                            <span class="font-bold text-base">Trailer</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>