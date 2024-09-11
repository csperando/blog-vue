<script setup>
    // event methods
    import { onMounted } from 'vue';

    // state management
    import { initUserStore } from './stores/user.store';
    const userStore = initUserStore();
    
    // top level template components
    import navbar from './components/navbar.vue';


    onMounted(async () => {
        // check if user stored auth token is still valid and auto-login
        const success = await userStore.validateToken();
        if(success) {
            route.push({ name: "Home" });
        }
    })

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
