<script setup lang="ts">
import { useFetch, newsOptions } from "../utils/newsApi";
import NewsCard from "../components/NewsCard.vue";
import { INews } from "../Types/news.interface";
import { ref } from 'vue';
import Loader from "../components/Loader.vue";
const newsData = ref<INews[]>([]);
const loading = ref(false);
const fetchNewsData = async () => {
    loading.value = true;
    const url = 'https://bing-news-search1.p.rapidapi.com//news/search?q=cryptocurrency&safeSearch=Off&textFormat=Raw&freshness=Day&count=20';
    const response = await useFetch(url, newsOptions);
    loading.value = false;
    newsData.value = response.value;
};
fetchNewsData();
</script>
<template>
    <div>
        <div v-if="loading" class="mt-32">
            <Loader/>
        </div>
        <div v-else class="flex-center flex-wrap p-3 md:flex-between">
            <div v-for="news in newsData" :key="news.name">
                <NewsCard :name="news.name" :description="news.description" :datePublished="news.datePublished"
                    :url="news.url" />
            </div>
        </div>
    </div>
</template>
