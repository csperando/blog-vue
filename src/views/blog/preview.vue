
<script setup>
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const params = route.params;

</script>

<template>
    <section>
        <pre v-html="params.html"></pre>
    </section>
</template>

<style scoped>
    section {
        background-color: rgb(245, 245, 245);
        padding: 20px;
    }
</style>
