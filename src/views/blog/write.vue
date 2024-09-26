<script setup>
    import { base_path } from "../../config";
    import { ref, computed } from "vue";
    import { useRouter } from 'vue-router';
    import { initBlogStore } from "../../stores/blog.store";
    import postTile from "../../components/postTile.vue";

    const route = useRouter();
    const blogStore = initBlogStore();

    // new post data
    const title = ref("");
    const author = ref("Coleman Sperando");
    const markdown = ref("");
    const description = ref("");
    const thumbnail = ref("");
    const mime = ref("");

    // for tile preview
    const thumbnailBase64 = ref("");
    const thumbnailMimeType = ref("");

    const newPostData = computed(() => {
        return {
            title: title.value,
            author: author.value,
            markdown: markdown.value,
            html: "<p>error</p>",
            description: description.value,
            thumbnail: thumbnail.value,
            mime: mime.value,
        };
    });

    const readFile = async (event) => {
        try {
            // get image data by input id
            const imageData = document.getElementById("input-thumbnail").files[0] || null;
            
            // validators
            if(imageData.size > 51200) {
                // console.log(imageData.size);
                throw(new Error("Image too large. Must be below 50KB."));
            }
            
            // convert to array buffer and parse bytes, then convert to base64
            const b = await imageData.arrayBuffer();
            let base64String = "";
            let bytes = new Uint8Array(b);
            let l = bytes.byteLength;
            for(let i = 0; i < l; i++) {
                base64String += String.fromCharCode(bytes[i]);
            }
            base64String = btoa(base64String);
            
            // update preview tile
            thumbnailBase64.value = base64String;
            thumbnailMimeType.value = imageData.type;

            // update new post data object
            thumbnail.value = base64String;
            mime.value = imageData.type;

        } catch(err) {
            console.error(err);
        }
    }

    const preview = () => {
        console.log("preview");
    }

    const submit = async () => {
        const newPost = await blogStore.uploadNewBlogPost(newPostData);
        route.push({ name: "BlogPost", params: newPost });
    }

</script>

<template>
    <section>
        <p>&nbsp;</p>

        <br/>

        <form>

            <div class="two-col">
                <div>
                    <label for="post-title">Title:</label><br/>
                    <input type="text" name="title" v-model="title" id="post-title"/>
                    
                    <br/><br/>
                    
                    <label for="post-author">Author:</label><br/>
                    <input type="text" name="author" v-model="author" readonly id="post-author"/>
                    
                    <br/><br/>
                    
                    <label for="post-description">Description:</label><br/>
                    <input type="text" name="description" v-model="description" id="post-description"/>
                    
                    <br/><br/>

                    <label for="input-thumbnail">Thumbnail:</label><br/>
                    <input type="file" name="thumbnail" @change="readFile" id="input-thumbnail"/>
                    
                    <br/><br/>
                </div>
            
                <postTile class="preview"
                    :title="title"
                    :timestamp="`${new Date()}`"
                    :description="description"

                    :preview="true"
                    :thumbnailBase64="thumbnailBase64"
                    :thumbnailMimeType="thumbnailMimeType"
                    />
            </div>

            <div>
                <br/><br/>
                
                <label for="post-markdown">Markdown:</label><br/>
                <textarea name="markdown" rows="20" cols="120" v-model="markdown" id="post-markdown"></textarea>
                
                <br/><br/>
                
                <div class="two-col">
                    <input type="button" name="submit" value="submit" @click="submit"/>
                    <input type="button" name="preview" value="preview" @click="preview"/>
                </div>
            </div>

        </form>
    </section>
</template>

<style scoped>
    .two-col {
        display: flex;
        flex-direction: row;
        position: relative;
        width: 100%;
        justify-content: center;
        align-items: flex-start;
        gap: 20px;
    }

    .preview {
        width: 300px;
    }

    textarea {
        width: 100%;
    }
</style>
