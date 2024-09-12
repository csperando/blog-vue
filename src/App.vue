<script setup>
    // event methods
    import { onMounted } from 'vue';

    // state management
    import { initUserStore } from './stores/user.store';
    const userStore = initUserStore();
    
    import { initBlogStore } from './stores/blog.store';
    const blogStore = initBlogStore();
    
    // top level template components
    import navbar from './components/navbar.vue';


    onMounted(async () => {
        // check if user stored auth token is still valid and auto-login
        await userStore.validateToken();
        await blogStore.fetchRecentBlogPosts();
    });

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
