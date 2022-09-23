<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'; 
import Dashboard from '../components/Dashboard.vue';
import Widget from '../components/Widget.vue';
</script>

<template>
    <div class="min-h-screen flex mx-auto">
        <Sidebar/>
        <Dashboard/>
        <Widget/>
    </div>
</template>