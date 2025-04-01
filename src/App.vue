<script setup>
    // event methods
    import { onMounted, provide } from 'vue';

    // state management
    import { initUserStore } from './stores/user.store';
    const userStore = initUserStore();
    provide('userStore', userStore);
    
    import { initBlogStore } from './stores/blog.store';
    const blogStore = initBlogStore();
    provide('blogStore', blogStore);
    
    // top level template components
    import navbar from './components/navbar.vue';

    onMounted(async () => {
        // check if user stored auth token is still valid and auto-login
        try {
            await blogStore.fetchRecentBlogPosts();
            await blogStore.fetchTopKeywords();
            await userStore.validateToken();

        } catch(err) {
            console.error(err);

        }
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
                <p>
                    Loading...
                    <br/>
                    I'm on the free tier, so this might take a minute...
                </p>
            </template>
        </Suspense>
    </main>
</template>

<style scoped>

</style>
