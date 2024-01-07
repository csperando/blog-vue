<script lang="ts">
    import { defineComponent } from "vue";
    import blogList from "../components/blogList.vue";

    import { useBlogStore } from "~/stores/blog.store";

    export default defineComponent({
        setup() {
            const blogStore = useBlogStore();

            return {
                blogStore,
            }
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
