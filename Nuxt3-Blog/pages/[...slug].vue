<script setup>
const { path } = useRoute();
const { data } = useAsyncData(`content-${path}`, async () => queryContent().where({ _path: path }).sort({ publishedAt: -1 }).findOne());
</script>
<template>
    <div class="max-w-2xl px-4 py-10 bg-gray-900 m-auto sm:px-8 sm:shadow sm:rounded">
        <div class="grid-layout" v-if="data">
            <img :src="data.image" :alt="data.title" class="w-96 h-64">
        </div>

        <div class="space-y-6 pb-6">

            <div class="text-center pt-6">
                <h1 class="font-bold text-white text-xl font-Roboto md:text-2xl">{{data.title}}</h1>
            </div>

            <div>
                <p class="text-gray-300">{{data.description}}</p>
            </div>

            <div class="w-full bg-gray-800">
                <Toc :links="data.body.toc.links" />
            </div>
        </div>
            <!-- Fetch and display the Markdown document from current path -->
            <ContentDoc class="prose prose-white prose-invert max-w-none">
                <!-- Slot if document is not found -->
                <template #not-found>
                    <h1 class="text-2xl">
                        Page not found
                    </h1>
                </template>
            </ContentDoc>
    </div>
</template>
<style lang="postcss">
.prose h1, h2, h3, h4, h5, h6 {
    @apply text-white
}
.prose a {
    @apply text-white font-bold no-underline
}

.prose {
    @apply text-gray-300
}
</style>