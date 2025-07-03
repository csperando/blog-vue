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

    import { initAnalyticsStore } from './stores/analytics.store';
    const analyticsStore = initAnalyticsStore();
    // provide('blogStore', blogStore);
    
    // top level template components
    import navbar from './components/navbar.vue';

    onMounted(async () => {
        // check if user stored auth token is still valid and auto-login
        try {
            const setupPromises = [
                blogStore.fetchRecentBlogPosts(),
                blogStore.fetchTopKeywords(),
                blogStore.fetchAllSeries(),
                userStore.validateToken(),
                analyticsStore.logViewer(),
            ];

            Promise.allSettled(setupPromises).then((results) => {
                results.forEach((res) => {
                    if(res.status === "rejected") {
                        // console.error(res.reason.message || "error");
                    }
                });
            });

        } catch(err) {
            console.error(err);

        }
    });

</script>

<template>
    <main>
        <!--
            <div class="app-background">
                <div class="absolute top-[200px] left-0 h-[calc(90%-200px)] transform-gpu overflow-hidden px-36 blur-3xl" aria-hidden="true">
                    <div class="mx-auto aspect-1155/678 w-full h-full bg-linear-to-tr from-[var(--app-color-bg)] to-[var(--vt-c-indigo)] opacity-50" 
                        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
                    </div>
                </div>
            </div>
        -->

        <navbar />
        
        <Suspense>
            <RouterView class="p-4"/>

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
    .app-background {
        position: absolute;
        top: 0;
        left: 0;
        padding: 0;
        margin: 0;
        overflow: hidden;
        box-sizing: border-box;
        width: 100vw;
        height: 100vh;
    }
</style>
