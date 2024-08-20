<script setup lang="ts">
    import { RouterView } from "vue-router";
    import { useBlogStore } from "./stores/blog";
    import NavBar from "./components/navbar.vue";

    const blog = useBlogStore();
    blog.log();
    
</script>

<template>
    <header>
        <div class="wrapper">
            <NavBar/>
        </div>
    </header>

    <RouterView />
</template>

<style scoped>

</style>
