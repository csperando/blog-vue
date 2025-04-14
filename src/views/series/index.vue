<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import { inject, onBeforeMount, ref } from 'vue';
    import { storeToRefs } from 'pinia';

    const route = useRoute();
    const router = useRouter();

    const seriesDisplayTitle = ref("");

    const blogStore = inject('blogStore');
    let { recentSeries } = storeToRefs(blogStore);

    onBeforeMount(async () => {
        try {
            if(!recentSeries) await blogStore.fetchAllSeries();

        } catch(err) {
            console.error(err);
            // router.push({ name: "NotFound" });
        }

    });

</script>

<template>
    <section>
        <h1>Recent Series</h1>

        <h2>These are collections of blog posts grouped together for some reason.</h2>

        <br/>

        <div v-if="recentSeries">
            <ul>
                <li v-for="(s, index) in recentSeries ">
                    <router-link :to="{ path: '/', query: {'series': s.slug} }">{{ s.title }}</router-link>
                </li>
            </ul>
        </div>
        <div v-else>
            <p>None yet :(</p>
        </div>

    </section>
</template>
