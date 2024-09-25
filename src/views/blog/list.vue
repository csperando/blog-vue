<script setup>
    import { initBlogStore } from '../../stores/blog.store';
    import { storeToRefs } from 'pinia';
    
    const blogStore = initBlogStore();
    const { recentBlogPosts } = storeToRefs(blogStore);

</script>

<template>
    <div>
        <div v-if="recentBlogPosts.length">
            <p>Most Recent:</p>
    
            <br/>
    
            <ul>
                <li v-for="blog in recentBlogPosts">
                    <div v-if="blog.html">
                        <p>
                            <router-link :to="{
                                name: 'BlogPost',
                                // params: { html: blog.html || 'error', title: blog.title } 
                                params: blog
                            }">{{ blog.title.toUpperCase() }}</router-link>
                            
                            <br/>
                            
                            <em>{{ blog.author }}</em>
                        </p>
                        <br/>
                    </div>
    
                    <div v-else>
                        <p>Error :(</p>
                    </div>
                </li>
            </ul>
        </div>

        <div v-else>
            <p >No blog posts yet</p>
        </div>
    </div>
</template>
