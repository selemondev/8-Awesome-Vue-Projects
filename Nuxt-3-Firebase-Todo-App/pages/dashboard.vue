<script setup lang="ts">
definePageMeta({
    middleware: "auth"
});

</script>
<template>
    <div>
        <TodoAppComponent/>
    </div>
</template>