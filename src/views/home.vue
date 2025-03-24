
<script setup>
    import { inject, onMounted, ref, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import { storeToRefs } from 'pinia';

    import loading from '@/components/misc/loading.vue';
    import postTile from '../components/postTile.vue';
    import postTileSmall from '../components/postTileSmall.vue';

    const blogStore = inject('blogStore');
    const { recentBlogPosts, topKeywords, blogsByTopKeyword } = storeToRefs(blogStore);
</script>

<template>
    <main>
        <p v-if="!recentBlogPosts">
            <loading :is-loading="true"/>
            <br/><br/>
            I'm on the free tier, so this might take a minute.
        </p>

        <section v-if="recentBlogPosts" id="featured">
            <h1 class="section-header">Most Recent:</h1>

            <div class="two-col desktop">
                <postTile v-if="recentBlogPosts" 
                    :postId="recentBlogPosts[0]._id"
                    :title="recentBlogPosts[0].title" 
                    :timestamp="recentBlogPosts[0].created" 
                    :description="recentBlogPosts[0].description" 
                    :preview="true"
                    :thumbnailMimeType="recentBlogPosts[0].mime"
                    :thumbnailBase64="recentBlogPosts[0].thumbnail"
                    />
    
                <div v-if="recentBlogPosts" class="post-container">
                    <postTileSmall v-for="(post, index) in recentBlogPosts.slice(0, 6)"
                        :postId="post._id"
                        :title="post.title" 
                        :timestamp="post.created" 
                        :description="post.description"
                        :thumbnailMimeType="post.mime"
                        :thumbnailBase64="post.thumbnail"
                        v-show="index"
                        class="post-wrapper-sm"
                        />
                    
                    <div class="post-wrapper-sm">
                        <router-link :to="{ name: 'Blog' }">More...</router-link>
                    </div>
    
                </div>
            </div>

            <div v-if="recentBlogPosts" class="mobile">  
                <div class="post-container">    
                    <postTileSmall v-for="(post, index) in recentBlogPosts.slice(0, 6)"
                        :postId="post._id"
                        :title="post.title" 
                        :timestamp="post.created" 
                        :description="post.description"
                        :thumbnailMimeType="post.mime"
                        :thumbnailBase64="post.thumbnail"
                        class="post-wrapper-sm"
                        />
                    
                    <div class="post-wrapper-sm">
                        <router-link :to="{ name: 'Blog' }">More...</router-link>
                    </div>
                </div>
            </div>
        </section>

        <section v-if="recentBlogPosts && topKeywords && blogsByTopKeyword" id="category" >
            <h2 class="section-header">Popular: <em>{{ topKeywords[0]._id }}</em></h2>

            <div class="two-col desktop" v-if="blogsByTopKeyword">
                
                <postTile :title="blogsByTopKeyword[0].title" 
                    :postId="blogsByTopKeyword[0]._id"
                    :timestamp="blogsByTopKeyword[0].created" 
                    :description="blogsByTopKeyword[0].description" 
                    :preview="true"
                    :thumbnailMimeType="blogsByTopKeyword[0].mime"
                    :thumbnailBase64="blogsByTopKeyword[0].thumbnail"
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
                        class="post-wrapper-sm"
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
                        class="post-wrapper-sm"
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

    .mobile {
        display: none;
    }

    @keyframes loading-dots {
        0% { content: ""; }
        33% { content: "."; }
        66% { content: ".."; }
        99% { content: "..."; }
    }

    .dots::after {
        content: "";
        animation: loading-dots 1.5s infinite steps(3);
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
