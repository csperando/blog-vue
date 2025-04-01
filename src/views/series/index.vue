<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import { inject, onBeforeMount, ref } from 'vue';

    const route = useRoute();
    const router = useRouter();

    const seriesDisplayTitle = ref("");
    
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

        <h2 class="text-red-300">Todo - description</h2>

        <br/><br/>

        <div>
            <ul>
                <li>Todo - series posts here</li>
                <li>Todo - series posts here</li>
                <li>Todo - series posts here</li>
            </ul>
        </div>
    </section>
</template>
