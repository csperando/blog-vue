
<script setup>

// import { defineProps } from 'vue'; // Compiler Macro, no longer needs to be imported

const props = defineProps({
    "title": String,
    "timestamp": String,
    "description": String,
    "thumbnail": String
});

const img = "assets/" + props.thumbnail;

</script>

<template>
    <div class="wrapper">
        <img :src="img" width="250px" height="250px" alt="todo - add alt text"/>

        <div class="metas">
            <span class="time">{{ timestamp }}</span>
            <p><b>{{ title.toUpperCase() }}</b></p>
            <p class="description"><em>{{ description }}</em></p>
        </div>
    </div>
</template>

<style scoped>
    * {
        position: relative;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: hsla(160, 100%, 37%, 0.2);
        padding: 10px;
        box-sizing: border-box;
        border-radius: 5px;
        box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.3);
        filter: drop-shadow(5px 5px 5px rgba(0,0,0,0.3));
    }

    .time {
        font-size: 12px;
    }

    .description {
        font-size: 14px;
    }

    .metas {
        width: 100%;
        text-align: left;
    }
</style>
