<script setup>
    import { inject } from 'vue';
    import { storeToRefs } from 'pinia';
    
    const blogStore = inject('blogStore');
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
                                params: { id: blog._id || 'error' }
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
