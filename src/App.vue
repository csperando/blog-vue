<script setup>
    // import { useRoute, useRouter } from 'vue-router';
    import navbar from './components/navbar.vue';
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
