<script setup>
</script>
<template>
    <div>
        <main class="grid grid-cols-1 -mt-5 mx-auto md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-5xl">
            <section class="col-span-2">
                <FeedStories />
            </section>
            <section class="hidden xl:inline-grid md:col-span-1">
                <main class="fixed top-16">
                    <SuggestionsComponent/>
                </main>
            </section>
        </main>
    </div>
</template>