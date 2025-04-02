
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

        // style props
        "width": {
            type: String,
            default: "w-[275px]",
        },
    });

    const img = "assets/" + props.thumbnail;
    const previewImg = computed(() => 'data:' + props.thumbnailMimeType + ';base64, ' + props.thumbnailBase64);

    // check length of title and description
    const displayTitle = computed(() => {
        return (props.title.length <= 15) ? props.title : props.title.substring(0, 15) + "...";
    });

    const displayDate = computed(() => {
        const timestamp = Date.parse(props.timestamp);
        const date = new Date(timestamp);
        const readable = date.toLocaleDateString();
        return readable;
    });

    const link = function() {
        route.push({ name: "BlogPost", params: { id: props.postId } });
    }

</script>

<template>
    <div class="flex flex-col items-center justify-between bg-[#00bd7e33] py-2 pl-4 pr-4 m-4 border rounded-sm shadow-md drop-shadow-lg hover:cursor-pointer hover:opacity-60"
        :class="width"
        :title="description + ' - ' + timestamp" 
        @click="link">

        <img v-if="!preview" :src="img" width="50px" height="50px" alt="todo - add alt text"/>
        <img v-else :src="previewImg" width="50px" height="50px" alt="todo - add alt text"/>

        <div class="flex flex-col items-center justify-center w-full py-2">
            <p class="text-md"><b>{{ displayTitle.toUpperCase() }}</b></p>
            <span class="text-xs">{{ displayDate }}</span>
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
</style>
