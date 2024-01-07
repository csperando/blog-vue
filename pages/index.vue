<script lang="ts">
    import { defineComponent } from "vue";
    import blogList from "../components/blogList.vue";

    export default defineComponent({
        setup() {

        },
        components: {
            "blog-list": blogList
        }
    })
</script>

<template>
    <div>
        <blog-list />
    </div>
</template>
