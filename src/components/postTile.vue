
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
        return (props.title.length <= 30) ? props.title : props.title.substring(0, 30) + "...";
    });

    const displayDate = computed(() => {
        const timestamp = Date.parse(props.timestamp);
        const date = new Date(timestamp);
        const readable = date.toLocaleDateString();
        return readable;
    });

    const displayDescription = computed(() => {
        if(props.description.length === 0) {
            return "Click to read more!";
        } else if(props.description.length <= 40) {
            return props.description; 
        } else {
            return props.description.substring(0, 40) + "...";
        }
    });

    const link = function() {
        route.push({ name: "BlogPost", params: { id: props.postId } });
    }

</script>

<template>
    <div class="flex flex-col items-center justify-between bg-[#00bd7e33] border rounded-sm shadow-md drop-shadow-lg w-[275px] hover:cursor-pointer hover:opacity-60 py-1 pl-2 pr-2 m-2 lg:py-2 lg:pl-4 lg:pr-4 lg:m-4"
        :class="width"
        @click="link" 
        :title="title">

        <img v-if="!preview" :src="img" width="250px" height="250px" alt="todo - add alt text"/>
        <img v-else :src="previewImg" width="250px" height="250px" alt="New Post Thumbnail Preview"/>

        <div class="flex flex-col items-start justify-center w-full py-2">
            <span class="text-xs">{{ displayDate }}</span>
            <p class="text-md"><b>{{ displayTitle.toUpperCase() }}</b></p>
            <p class="text-sm"><em>{{ displayDescription }}</em></p>
        </div>
    </div>
</template>
