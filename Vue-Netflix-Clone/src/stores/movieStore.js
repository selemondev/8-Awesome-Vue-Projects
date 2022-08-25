import { defineStore, acceptHMRUpdate } from "pinia";
import { useStorage } from "@vueuse/core";
export const useMovieStore = defineStore({
  id: "movie",
  state:() => ({
    movies: useStorage("movies", []),
    movieExists: false,
  }),

  getters: {
    MoviesExist: (state) => (movie) => {
      const movieId = state.movies.find((i) => i.title === movie.title);
      return movieId ? state.movieExists = true : state.movieExists = false;
    }
  },

  actions: {
    addMovie(movie) {
      const movieId = this.movies.find((i) => i.title === movie.title);
      console.log(movieId);
      if (movieId) {
        movieId.exists = true;
      } else {
        this.movies.push({...movie, exists: false })
        localStorage.setItem("movies", JSON.stringify(movie));
      }
    },

    removeMovie(movie) {
      this.movieExists = false;
      this.movies = this.movies.filter((i) => i.id !== movie.id);
    }
  }
});

if( import.meta.hot ) {
  import.meta.hot.accept(acceptHMRUpdate(useMovieStore, import.meta.hot));
}