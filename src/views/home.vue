
<script setup>
    import postTile from '../components/postTile.vue';
    import postTileSmall from '../components/postTileSmall.vue';
    import { initBlogStore } from '../stores/blog.store';
    import { storeToRefs } from 'pinia';
    import { useRouter } from 'vue-router';
    import { onMounted, ref, watch } from 'vue';
    
    const route = useRouter();

    const blogStore = initBlogStore();
    const { recentBlogPosts, topKeywords, blogsByTopKeyword } = storeToRefs(blogStore);

    // create a simple loading animation for the elipses after the text "loading"
    const dots = ref("...");
    onMounted(async () => {
        const loadingInterval = setInterval(() => {
            let l = dots.value.length;
            l = (l + 1) % 4;
            dots.value = ".".repeat(l);
        }, 500);
        
        watch(recentBlogPosts, async() => {
            clearInterval(loadingInterval);
        });
    });
</script>

<template>
    <main>
        <p v-if="!recentBlogPosts">
            Loading<span>{{dots}}</span>
            <br/><br/>
            I'm on the free tier, so this might take a minute.
        </p>

        <section v-if="recentBlogPosts" id="featured">
            <p class="section-header">Most Recent:</p>

            <div class="two-col desktop">
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
                        <router-link :to="{ name: 'Blog' }">More...</router-link>
                    </div>
    
                </div>
            </div>

            <div v-if="recentBlogPosts" class="mobile">  
                <div class="post-container">    
                    <postTileSmall v-for="(post, index) in recentBlogPosts"
                        :postId="post._id"
                        :title="post.title" 
                        :timestamp="post.created" 
                        :description="post.description"
                        :thumbnailMimeType="post.mime"
                        :thumbnailBase64="post.thumbnail"
                        class="post-wrapper-sm link"
                        />
                    
                    <div class="post-wrapper-sm">
                        <router-link :to="{ name: 'Blog' }">More...</router-link>
                    </div>
                </div>
            </div>
        </section>

        <section v-if="recentBlogPosts && topKeywords && blogsByTopKeyword" id="category" >
            <p class="section-header">{{ topKeywords[0]._id }}</p>

            <div class="two-col desktop" v-if="blogsByTopKeyword">
                
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

            <div class="mobile" v-if="blogsByTopKeyword">
                <div class="post-container">
                    <postTileSmall v-for="(post, index) in blogsByTopKeyword"
                        :postId="post._id"
                        :title="post.title" 
                        :timestamp="post.created" 
                        :description="post.description"
                        :thumbnailMimeType="post.mime"
                        :thumbnailBase64="post.thumbnail"
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
        padding: 0;
        margin: 0;
    }

    section {
        margin-bottom: 30px;
    }

    .section-header {
        margin-bottom: 10px;
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

    .mobile {
        display: none;
    }

    @media only screen and (max-width: 720px) {
        .desktop {
            display: none;
        }

        .mobile {
            display: flex;
        }

        .mobile .post-container {
            flex-basis: auto;
            width: 100%;
        }
    }
    
</style>
