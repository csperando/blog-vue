<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import { inject, onBeforeMount, ref } from 'vue';
    import { storeToRefs } from 'pinia';

    const route = useRoute();
    const router = useRouter();

    const seriesDisplayTitle = ref("");

    // for testing carosel
    import tileSlide from "../../components/tileSlide.vue";

    const blogStore = inject('blogStore');
    const { recentBlogPosts, topKeywords, blogsByTopKeyword } = storeToRefs(blogStore);
    //
    
    onBeforeMount(async () => {
        try {

            // console.log(route.query);

            if(route.query.series) {
                // TODO - get info by series slug
            } else {
                throw(new Error("Something went wrong searching for a blog post."));
            }

            // route info
            if(!true) {
                throw(new Error("Something went wrong searching for a blog post."));
            }
            
            if(route.query.series) {
                router.replace("/?series=" + route.query.series);
                seriesDisplayTitle.value = route.query.series;
            }
    
            // TODO - update page data

        } catch(err) {
            console.error(err);
            router.push({ name: "NotFound" });
        }

    });

</script>

<template>
    <section>
        <h1>{{ seriesDisplayTitle }}</h1>

        <h2>Todo - description</h2>

        <tile-slide :posts="recentBlogPosts" :start="2"/>

    </section>
</template>
