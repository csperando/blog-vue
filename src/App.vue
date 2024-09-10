<script setup>
    // state management
    import { initUserStore } from './stores/user.store';
    import { initBlogStore } from './stores/blog.store';
    
    // import { useRoute, useRouter } from 'vue-router';

    // top level template components
    import navbar from './components/navbar.vue';


    const userStore = initUserStore();
    const blogStore = initBlogStore();

</script>

<template>
    <main>
        <navbar />

        <br/>
        <br/>
        
        <Suspense>
            <RouterView />

            <template #fallback>
                Loading...
            </template>
        </Suspense>
    </main>
</template>

<style scoped>

</style>
