<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import { inject, onBeforeMount, ref } from 'vue';
    import { storeToRefs } from 'pinia';

    const route = useRoute();
    const router = useRouter();

    const seriesDisplayTitle = ref("");

    const blogStore = inject('blogStore');
    const { currentSeries } = storeToRefs(blogStore);
    
    onBeforeMount(async () => {
        try {
            // parse url query input
            if(route.query.series) {
                let s = await blogStore.fetchSeriesBySlug(route.query.series);

                if(s?.length || false) {
                    currentSeries.value = s[0];
                } else {
                    throw(new Error("Something went wrong searching for a series."));
                };

            } else {
                throw(new Error("Something went wrong searching for a series."));
            }

        } catch(err) {
            console.error(err);
            router.push({ name: "NotFound" });
        }

    });

</script>

<template>
    <section v-if="currentSeries">
        <h1>{{ currentSeries.title || "error" }}</h1>
        <h2>{{ currentSeries.description || "error" }}</h2>

        <br/>

        <div v-if="currentSeries.posts.length">
            <ul>
                <li v-for=" (post, index) in currentSeries.posts">
                    <router-link :to="{ path: '/', query: { blog: post.slug } }">{{ post.title }}</router-link>
                </li>
            </ul>
        </div>
        <div v-else>
            <p>No posts yet.</p>
        </div>
        
    </section>
</template>
