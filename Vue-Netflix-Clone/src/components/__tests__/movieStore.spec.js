import { setActivePinia, createPinia } from "pinia";
import { useMovieStore } from "../../stores/movieStore";
describe("Test movieStore", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });
    test("The movieStore should be empty", () => {
        const movieStore = useMovieStore();
        expect(movieStore.movies).toStrictEqual([]);
        expect(movieStore.movieExists).toBe(false);
    })
})