
<script setup>
    import { inject, onMounted, ref, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import { storeToRefs } from 'pinia';

    import loading from '@/components/misc/loading.vue';
    import postTile from '../components/postTile.vue';
    import postTileSmall from '../components/postTileSmall.vue';
    import tileSlide from "../components/tileSlide.vue";

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

        <section v-if="recentBlogPosts">
            <div class="hidden lg:block">
                <h1 class="section-header">Most Recent:</h1>
    
                <div class="flex flex-row w-full justify-center items-stretch">
                    <postTile
                        :postId="recentBlogPosts[0]._id"
                        :title="recentBlogPosts[0].title" 
                        :timestamp="recentBlogPosts[0].created" 
                        :description="recentBlogPosts[0].description" 
                        :preview="true"
                        :thumbnailMimeType="recentBlogPosts[0].mime"
                        :thumbnailBase64="recentBlogPosts[0].thumbnail"
                        :width="'w-[350px]'"
                    />
        
                    <div class="post-container">
                        <tile-slide :posts="recentBlogPosts.slice(1, 6)"/>
                    </div>
                </div>
            </div>

            <div class="lg:hidden">
                <h1 class="section-header">Most Recent:</h1>
    
                <div class="flex flex-row w-full justify-center items-stretch">        
                    <div class="post-container">
                        <tile-slide :posts="recentBlogPosts.slice(0, 6)" :tile-width="'w-[250px]'"/>
                    </div>
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
    
</style>
