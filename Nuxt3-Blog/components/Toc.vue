<!-- ./components/Toc.vue -->

<script setup>
// define links prop
defineProps(["links"]);
// flatten TOC links nested arrays to one array
const flattenLinks = (links) => {
    let _links = links
        .map((link) => {
            let _link = [link];
            if (link.children) {
                let flattened = flattenLinks(link.children);
                _link = [link, ...flattened];
            }
            return _link;
        })
        .flat(1);
    return _links;
};
</script>

<template>
    <nav class="bg-gray-900/50">
        <header class="text-white text-center py-2 px-2">
            <h3 class="text-xl font-bold">Table of contents</h3>
        </header>
        <ol class="list-inside list-disc">
            <!-- render each link with depth class -->
            <li v-for="link of flattenLinks(links)" :key="link.id" :class="`toc-link _${link.depth}`">
                <a class="text-gray-200 hover:text-white hover:font-bold" :href="`#${link.id}`">
                    {{ link.text }}
                </a>
            </li>
        </ol>
    </nav>
</template>

<style scoped>
.toc {
    @apply p-4 bg-gray-50 border border-gray-200 rounded-lg;
    @apply max-h-[calc(100vh-6rem)] overflow-auto;
}

.toc-links {
    @apply flex flex-col gap-2 px-2;
}

.toc-link {
    @apply text-slate-500;
}

.toc-link._3 {
    @apply pl-3;
}

.toc-link._4 {
    @apply pl-6;
}

.toc-link._undefined {
    @apply pl-8;
}
</style>