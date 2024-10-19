
<script setup>
    import { computed } from "vue";
    import { useRouter } from 'vue-router';
    
    const route = useRouter();

    const props = defineProps({
        "postId": String,
        "title": String,
        "timestamp": String,
        "description": String,
        "thumbnail": String,

        // These props are for previewing the post tile while writing a new blog post
        "preview": {
            type: Boolean,
            default: false,
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

    const link = function() {
        route.push({ name: "BlogPost", params: { id: props.postId } });
    }

</script>

<template>
    <div class="wrapper" @click="link">

        <img v-if="!preview" :src="img" width="250px" height="250px" alt="todo - add alt text"/>
        <img v-else :src="previewImg" width="250px" height="250px" alt="New Post Thumbnail Preview"/>

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
