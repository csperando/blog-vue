
<script setup>
    import postTile from '../components/postTile.vue';
    import postTileSmall from '../components/postTileSmall.vue';
    import { initBlogStore } from '../stores/blog.store';
    import { storeToRefs } from 'pinia';
    import { useRouter } from 'vue-router';
    
    const route = useRouter();

    const blogStore = initBlogStore();
    const { recentBlogPosts, topKeywords, blogsByTopKeyword } = storeToRefs(blogStore);

</script>

<template>
    <main>
        <section id="featured" class="two-col">

            <p v-if="!recentBlogPosts">
                Loading...
                <br/><br/>
                I'm on the free tier, so this might take a minute...
            </p>

            <postTile v-if="recentBlogPosts" 
                :postId="recentBlogPosts[0]._id"
                :title="recentBlogPosts[0].title" 
                :timestamp="recentBlogPosts[0].created" 
                :description="recentBlogPosts[0].description" 
                :preview="true"
                :thumbnailMimeType="recentBlogPosts[0].mime"
                :thumbnailBase64="recentBlogPosts[0].thumbnail"
                class="link"
                />

            <div v-if="recentBlogPosts" class="post-container">
                <!-- smaller blog post components -->
                <postTileSmall v-for="(post, index) in recentBlogPosts"
                    :postId="post._id"
                    :title="post.title" 
                    :timestamp="post.created" 
                    :description="post.description"
                    :thumbnailMimeType="post.mime"
                    :thumbnailBase64="post.thumbnail"
                    v-show="index"
                    class="post-wrapper-sm link"
                    />
                
                <div class="post-wrapper-sm">
                    <p>More...</p>
                </div>

            </div>
        </section>

        <section id="category" v-if="topKeywords && blogsByTopKeyword">
            <p>{{ topKeywords[0]._id }}</p>

            <div class="two-col" v-if="blogsByTopKeyword">
                
                <postTile :title="blogsByTopKeyword[0].title" 
                    :postId="blogsByTopKeyword[0]._id"
                    :timestamp="blogsByTopKeyword[0].created" 
                    :description="blogsByTopKeyword[0].description" 
                    :preview="true"
                    :thumbnailMimeType="blogsByTopKeyword[0].mime"
                    :thumbnailBase64="blogsByTopKeyword[0].thumbnail"
                    class="link"
                    />
                
                <div class="post-container">
                    <postTileSmall v-for="(post, index) in blogsByTopKeyword"
                        :postId="post._id"
                        :title="post.title" 
                        :timestamp="post.created" 
                        :description="post.description"
                        :thumbnailMimeType="post.mime"
                        :thumbnailBase64="post.thumbnail"
                        v-show="index"
                        class="post-wrapper-sm link"
                        />
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
    * {
        position: relative;
    }

    .two-col {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: flex-start;
        margin-bottom: 50px;
    }

    .post-wrapper-sm {
        flex-basis: 33%;
    }

    .post-container {
        flex-basis: 50%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20px;
    }

    .link:hover {
        cursor: pointer;
        filter: brightness(0.5);
    }

    /* TODO - add media breakpoints */
    
</style>
