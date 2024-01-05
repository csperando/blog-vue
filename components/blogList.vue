<script lang="ts">
    import { defineComponent } from "vue";

    export default defineComponent({
        async setup() {
            const endpoint = "http://192.168.1.230:8080/blog";
            const blogs: Promise<any | void> = await fetch(endpoint)
                .then((res) => {
                    return res.json();
                }).catch((err) => {
                    console.log(err);
                });

            const posts = (blogs) ? (blogs as any)?.data : [];

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
