
<script setup>
import { computed } from "vue";

const props = defineProps({
    "title": String,
    "timestamp": String,
    "description": String,
    "thumbnail": String,
    "preview": {
        type: Boolean,
        default: true,
    },
    "thumbnailBase64": {
        type: String,
        default: "",
    },
    "thumbnailMimeType": {
        type: String,
        default: "Image/jpeg",
    },
});

const img = "assets/" + props.thumbnail;

const previewImg = computed(() => 'data:' + props.thumbnailMimeType + ';base64, ' + props.thumbnailBase64);

</script>

<template>
    <div class="wrapper" :title="description + ' - ' + timestamp">
        <img v-if="!preview" :src="img" width="50px" height="50px" alt="todo - add alt text"/>
        <img v-else :src="previewImg" width="50px" height="50px" alt="todo - add alt text"/>

        <div class="metas">
            <p><b>{{ title.toUpperCase() }}</b></p>
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
        padding: 5px;
        box-sizing: border-box;
        border-radius: 5px;
        box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.3);
        filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.3));
    }

    .metas {
        width: 100%;
        text-align: center;
        font-size: 12px;
    }
</style>
