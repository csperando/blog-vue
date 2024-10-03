<script setup>
    import { useRoute } from 'vue-router';
    import { computed, onBeforeMount, ref } from 'vue';
    import { initBlogStore } from "../../stores/blog.store";
    import { storeToRefs } from 'pinia';

    const route = useRoute();
    const params = route.params;

    const blogStore = initBlogStore();
    let { currentBlogPost } = storeToRefs(blogStore);
    
    const previewImg = ref("");
    const displayDate = ref("");
    
    onBeforeMount(async () => {
        currentBlogPost = await blogStore.fetchBlogByID(params.id);
        previewImg.value = 'data:' + currentBlogPost?.mime + ';base64, ' + currentBlogPost?.thumbnail;
        displayDate.value = (new Date(Date.parse(currentBlogPost.created))).toDateString();
    });

</script>

<template>
    <section>
        <div>
            <img v-if="currentBlogPost?.thumbnail != ''" :src="previewImg" width="250px" height="250px"/>

            <p>
                <b>{{ currentBlogPost?.title.toUpperCase() }}</b>
                <br/>
                
                {{ currentBlogPost?.description }}
                <br/><br/>
                
                <em>{{ currentBlogPost?.author }}</em>
                <br/>
                
                <em>{{ displayDate }}</em>
                <br/>
            </p>
        </div>
        
        <br/>
        <hr/>
        <br/>


        <article v-html="currentBlogPost?.html"></article>
    </section>
</template>

<style scoped>
    section {
        display: flex;
        flex-direction: column;
    }

    div {
        display: flex;
        flex-direction: row;
        gap: 50px;
        align-items: center;
    }

    article {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 70vw;
        left: 15vw;
    }
</style>
