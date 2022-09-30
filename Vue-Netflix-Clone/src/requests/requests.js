const API_KEY = "63ef9c1da41cd3c843dcec9ed2264b73"
const requests = {
    fetchTrending:`/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals:`/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated:`/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies:`/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies:`/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies:`/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchAnimationMovies:`/discover/movie?api_key=${API_KEY}&with_genres=16`,
    fetchDocumentaries:`/discover/movie?api_key=${API_KEY}&with_genres=99`,
}
export default requests;