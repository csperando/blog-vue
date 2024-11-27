<script setup>
    import '../../assets/gh.css';

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
        <div class="post-head">
            <img v-if="currentBlogPost?.thumbnail" :src="previewImg" width="250px" height="250px"/>

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


        <article v-html="currentBlogPost?.html" class="markdown-body"></article>
    </section>
</template>

<style scoped>
    * {
        position: relative;
        margin: 0;
        padding: 0;
    }

    section {
        display: flex;
        flex-direction: column;
    }

    .post-head {
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

    @media only screen and (max-width: 720px) {
        .post-head {
            flex-direction: column;
        }

        article {
            width: 80vw;
            left: 5vw;
        }
    }
</style>
