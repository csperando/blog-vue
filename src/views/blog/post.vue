<script setup>
    import '../../assets/gh.css';

    import { useRoute, useRouter } from 'vue-router';
    import { inject, onBeforeMount, ref } from 'vue';
    import { storeToRefs } from 'pinia';

    const route = useRoute();
    const router = useRouter();

    const blogStore = inject('blogStore');
    let { currentBlogPost } = storeToRefs(blogStore);
    
    const previewImg = ref("");
    const displayDate = ref("");
    
    onBeforeMount(async () => {
        try {
            // get blog post data - this component is accessed with either a param id or the slug in the query string
            if(route.params.id) {
                const p = route.params.id.trim();
                currentBlogPost = await blogStore.fetchBlogByID(p);
            } else if(route.query.blog) {
                const s = route.query.blog.trim().toLowerCase();
                currentBlogPost = await blogStore.fetchBlogBySlug(s);
            } else {
                throw(new Error("Something went wrong searching for a blog post."));
            }

            // route info
            if(!currentBlogPost) {
                throw(new Error("Something went wrong searching for a blog post."));
            }
            
            if(currentBlogPost?.slug) {
                router.replace("/?blog=" + currentBlogPost.slug);
            }
    
            // update page data
            previewImg.value = 'data:' + currentBlogPost?.mime + ';base64, ' + currentBlogPost?.thumbnail;
            displayDate.value = (new Date(Date.parse(currentBlogPost.created))).toDateString();

        } catch(err) {
            console.error(err);
            router.push({ name: "NotFound" });
        }

    });

</script>

<template>
    <section class="post-wrap">
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

    .post-wrap {
        position: relative;
        width: 100%;
    }

    .post-head {
        position: relative;
        display: flex;
        flex-direction: row;
        gap: 50px;
        align-items: center;
    }

    article {
        position: relative;
        display: flex;
        flex-direction: column;
        position: relative;
        width: 80%;
        left: 10%;
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
