<script lang="ts">
    import { defineComponent } from "vue";
    import blogList from "../components/blogList.vue";

    import { useBlogStore } from "~/stores/blog.store";

    export default defineComponent({
        async setup() {
            const blogStore = useBlogStore();
            await blogStore.getPosts();
            const blogs = blogStore.blogs;

            return {
                blogStore,
                blogs
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
