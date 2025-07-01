<script setup>
    import { inject, ref, onMounted } from 'vue';
    import { storeToRefs } from 'pinia';

    import searchInput from "@/components/form/searchInput.vue";
    import loading from "@/components/misc/loading.vue";
    import postTile from '@/components/postTile.vue';
    
    const blogStore = inject('blogStore');
    const { recentBlogPosts } = storeToRefs(blogStore);

    import { pipeline } from '@huggingface/transformers';

    // toggle loading animation
    const isLoading = ref(false);

    // input text value
    const q = ref("");

    // use 'display' as a clone of the store value to prevent altering the original var
    const display = ref(null);
    onMounted(async () => {
        isLoading.value = true;
        await blogStore.fetchRecentBlogPosts();
        display.value = recentBlogPosts.value;
        isLoading.value = false;
    });

    const filterTitles = function(query) {
        const filterBy = query.toLowerCase();
        let filtered = [];
        recentBlogPosts.value.forEach((blog) => {
            if(blog.title && blog.title.toLowerCase().indexOf(filterBy) != -1) {
                filtered.push(blog);
            }
        });

        display.value = filtered;
    }

    const update = async function(updated) {
        try {
            isLoading.value = true;
            q.value = updated.value;
            filterTitles(q.value);
            isLoading.value = false;

            // TODO // Create embeddings from text input
            const extractor = await pipeline(
                "feature-extraction",
                "mixedbread-ai/mxbai-embed-xsmall-v1",
                { device: "webgpu", dtype: "fp32" },
            );
            const texts = [q.value];
            const embeddings = await extractor(texts, { pooling: "mean", normalize: true });
            const test = await blogStore.searchBlogsByVector(embeddings);
            console.log(test);
            
        } catch(err) {
            isLoading.value = false;
        }
    }

</script>

<template>
    <div class="flex flex-col items-center">
        <!-- Search input -->
        <div>
            <search-input :placeholder="'Search blogs by title'" :value="q" :loading @update-search-input="update"/>
            <br/><br/>
            <loading :isLoading class="loading-animation"/>
            <br/>
        </div>
        
        <div v-if="recentBlogPosts?.length || false" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch justify-items-stretch">
            <post-tile 
                v-for="blog in display"    
                :postId="blog._id"
                :title="blog.title" 
                :timestamp="blog.created" 
                :description="blog.description" 
                :preview="true"
                :thumbnailMimeType="blog.mime"
                :thumbnailBase64="blog.thumbnail"
                class="link"/>
        </div>

        <div v-else-if="!isLoading">
            <p >No blog posts yet</p>
        </div>
    </div>
</template>
