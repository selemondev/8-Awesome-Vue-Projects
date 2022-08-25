<script setup>
import Banner from '../components/Banner.vue';
import Row from '../components/Row.vue';
import requests from '../requests/requests';
import Loader from '../components/Loader.vue';
import Navbar from '../components/Navbar.vue';
</script>

<template>
  <div class="min-h-screen w-full">
    <Navbar/>
    <Banner />
    <Suspense>
      <div class=" px-2 md:pt-1">
        <Row title="Trending" largeImage :fetchUrl="requests.fetchTrending" />
        <Row title="Netflix Originals" :fetchUrl="requests.fetchNetflixOriginals" />
        <Row title="Top Rated" :fetchUrl="requests.fetchTopRated" />
        <Row title="Action Movies" :fetchUrl="requests.fetchActionMovies" />
        <Row title="Comedy Movies" :fetchUrl="requests.fetchComedyMovies" />
        <Row title="Horror Movies" :fetchUrl="requests.fetchHorrorMovies" />
        <Row title="Animation Movies" :fetchUrl="requests.fetchAnimationMovies" />
        <Row title="Documentaries" :fetchUrl="requests.fetchDocumentaries" />
      </div>

      <template #fallback>
        <Loader/>
      </template>
    </Suspense>
  </div>
</template>
