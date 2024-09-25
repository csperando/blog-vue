<script setup>
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const params = route.params;
    
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
            <em>{{ params.created }}</em>
            <br/>
        </p>
        
        <br/>
        <hr/>
        <br/>

        <div v-html="params.html"></div>
    </section>
</template>
