<script setup>
import FeedStories from "../components/FeedStories.vue";
import FeedInput from "../components/FeedInput.vue";
import SuggestionsComponent from "../components/SuggestionsComponent.vue";
import PostComponent from "../components/PostComponent.vue";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { ref, watchEffect } from "vue";
const postData = ref([]);
watchEffect(() => {
    const postReference = collection(db, "posts");
    const q = query(postReference, orderBy("timeStamp", "desc"));
    const unsub = onSnapshot(q, querySnapshot => {
        let posts = [];
        querySnapshot.forEach(doc => {
            posts.push({ ...doc.data(), id: doc.id });
        });
        postData.value = posts;
    });
    return () => unsub();
})
</script>
<template>
    <div>
        <main class="grid grid-cols-1 -mt-5 mx-auto md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-5xl">
            <section class="col-span-2">
                <FeedStories />
                <FeedInput class="mt-4 w-full" />
                <div v-for="post in postData" :key="post.id">
                    <PostComponent :id="post.id" :username="post.username" :profile="post.profile" :text="post.text"
                        :media="post.media" :timeStamp="post.timeStamp" />
                </div>
            </section>
            <section class="hidden xl:inline-grid md:col-span-1">
                <main class="fixed top-16">
                    <SuggestionsComponent />
                </main>
            </section>
        </main>
    </div>
</template>