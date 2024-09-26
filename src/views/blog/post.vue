<script setup>
    import { useRoute } from 'vue-router';
    import { computed } from 'vue';

    const route = useRoute();
    const params = route.params;
    
    const displayDate = computed(() => {
        const d = new Date(Date.parse(params.created));
        return d.toDateString();
    });

    const previewImg = computed(() => 'data:' + params.mime + ';base64, ' + params.thumbnail);
</script>

<template>
    <section>
        <p>
            <b>{{ params.title.toUpperCase() }}</b>
            <br/>
            {{ params.description }}
            <br/><br/>
            <em>{{ params.author }}</em>
            <br/>
            <em>{{ displayDate }}</em>
            <br/>
        </p>
        
        <br/>
        <hr/>
        <br/>

        <img :src="previewImg" width="250px" height="250px"/>

        <div v-html="params.html"></div>
    </section>
</template>

<style scoped>
    section {
        display: flex;
        flex-direction: column;
    }

    section > div {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 70vw;
        left: 15vw;
    }
</style>
