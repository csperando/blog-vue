<script lang="ts">
    import { defineComponent } from "vue";
    import { useBlogStore } from "#imports";

    import { type iBlogPost } from "../models/Blog";

    export default defineComponent({
        async setup() {
            const blogStore = useBlogStore();
            const posts: iBlogPost[] = blogStore.blogs;

            return {
                posts
            }
        }
    })
</script>

<template>
    <section>
        <div v-if="posts.length">
            <p>Blogs</p>
            <br/>
            <ul >
                <li v-for="b of posts">
                    <NuxtLink :to="'/blog/' + b.title">{{ b.title }}</NuxtLink>
                </li>
            </ul>
        </div>
        <div v-else>
            <p>No blog posts yet. Try again soon!</p>
        </div>
    </section>
</template>

<style scoped>
    div {
        margin: 30px;
    }

    ul {
        margin: 10px;
    }
</style>
