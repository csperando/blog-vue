
<script setup>
    import postTile from '../components/postTile.vue';
    import postTileSmall from '../components/postTileSmall.vue';
    import { initBlogStore } from '../stores/blog.store';
    import { storeToRefs } from 'pinia';
    import { useRouter } from 'vue-router';
    
    const route = useRouter();

    const blogStore = initBlogStore();
    const { recentBlogPosts } = storeToRefs(blogStore);

    const link = function(id) {
        route.push({ name: "BlogPost", params: { id: id } });
    }

</script>

<template>
    <main>
        <section id="featured" class="two-col">

            <p v-if="!recentBlogPosts">Loading...</p>

            <postTile v-if="recentBlogPosts" 
                :title="recentBlogPosts[0].title" 
                :timestamp="recentBlogPosts[0].created" 
                :description="recentBlogPosts[0].description" 
                :preview="true"
                :thumbnailMimeType="recentBlogPosts[0].mime"
                :thumbnailBase64="recentBlogPosts[0].thumbnail"
                @click="link(recentBlogPosts[0]._id)"
                class="link"
                />

            <div v-if="recentBlogPosts" class="post-container">
                <!-- smaller blog post components -->
                <postTileSmall v-for="(post, index) in recentBlogPosts"
                    :title="post.title" 
                    :timestamp="post.created" 
                    :description="post.description"
                    :thumbnailMimeType="post.mime"
                    :thumbnailBase64="post.thumbnail"
                    class="post-wrapper-sm link"
                    
                    v-show="index"
                    @click="link(post._id)"
                    />
                
                <div class="post-wrapper-sm">
                    <p>More...</p>
                </div>

            </div>
        </section>

        <section id="category">
            <p>DevOps</p>

            <div class="two-col">
                
                <postTile title="I love DevOps!" timestamp="14 Sept 2024" description="A love story" thumbnail="logo.svg"/>
                
                <div class="post-container">
                    <postTileSmall v-for="i in [1, 2, 3, 4]" 
                        :title="'DevOps Test - ' + i" 
                        timestamp="12 Sept 2024" 
                        description="An example blog post" 
                        thumbnail="logo.svg"
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
