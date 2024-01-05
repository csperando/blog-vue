<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

import Nuxt from "nuxt";

export default defineComponent({
    async setup() {
        const router = useRoute();
        
        let title = (router.params.title) as string;
        const endpoint = "http://192.168.1.230:8080/blog/" + title;
        const blog = await fetch(endpoint)
            .then((res) => {
                return res.json();
            }).then((res) => {
                // console.log(res);
                const html = res.data.html || "";
                return html;
            }).catch((err) => {
                console.log(err);
            });

        while(title.indexOf("-") != -1) {
            title = title.replace("-", " ");
        }

        return {
            title,
            blog
        }
    },
});
</script>

<template>
    <section class="blog-wrapper">
        <h1>{{ title }}</h1>
        <article class="blog-wrapper" v-html="blog"></article>
    </section>
</template>

<style scoped>
    @import "../../public/gh.css";

    section.blog-wrapper {
        margin: 50px;
    }

    article.blog-wrapper {
        padding: 30px;
    }
</style>
