
<script setup>
    import { inject, onMounted, ref, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import { storeToRefs } from 'pinia';

    import loading from '@/components/misc/loading.vue';
    import postTile from '../components/postTile.vue';
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
                <h1 class="section-header">Most Recent</h1>
    
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

        <br/>
        <br/>

        <section>
            <h1>About Me</h1>
    
            <br/>
    
            <p>
                Welcome to my personal blog! I'm Coleman Sperando, a passionate full-stack developer with a deep love for technology and adventure. With a solid background in ColdFusion, TypeScript, Node.js, Express, SQL Server, Git, Docker, Azure, JIRA, and Python, I bring a wealth of experience to the table. Over the years, I've had the opportunity to work on diverse projects, including rebuilding entire legacy applications from the ground up, transitioning from ColdFusion to modern Node.js REST APIs and Vue.js front ends. My work focuses on leveraging best practices and experimenting with various design patterns to build scalable and maintainable applications.
            </p>
    
            <br/>
    
            <p>    
                As a developer, I'm always on the lookout for new challenges and opportunities to grow. I thrive in fast-paced environments and am committed to writing clean, efficient, and object-oriented code that supports scalability and growth. My passion for technology extends beyond the workplace; I enjoy diving into new technologies, exploring innovative solutions, and sharing my insights through this blog.
            </p>
    
            <br/>
    
            <p>
                But there's more to me than just code. When I'm not immersed in development, you'll likely find me embracing the thrill of BASE jumping and wingsuiting around some of the world's most breathtaking mountains. Traveling the globe, chasing the next great adventure, and experiencing the world from new heights fuels my creativity and keeps me inspired in all aspects of life. This blog is where I share my journey—both in tech and in the air.
            </p>
    
            <br/>
    
            <p>
                <a href="https://github.com/csperando">GitHub</a>
            </p>
        </section>
    </main>
</template>
