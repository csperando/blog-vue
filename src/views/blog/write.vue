<script setup>
    import { base_path } from "../../config";
    import { ref, computed, inject } from "vue";
    import { storeToRefs } from 'pinia';

    import { useRouter } from 'vue-router';
    
    import postTile from "../../components/postTile.vue";
    import { convertMarkdownToHTML } from "../../services/blog.service";

    const route = useRouter();
    const blogStore = inject('blogStore');
    const userStore = inject('userStore');
    let { userData } = storeToRefs(userStore);

    // new post data
    const title = ref("");
    const markdown = ref("");
    const description = ref("");
    const thumbnail = ref("");
    const mime = ref("");
    const keywords = ref("");

    // for tile preview
    const thumbnailBase64 = ref("");
    const thumbnailMimeType = ref("");

    // for markdown preview
    const htmlPreview = ref("");
    const toggleHtmlPreview = ref(false);

    const newPostData = computed(() => {
        return {
            title: title.value,
            author: (userData.value.firstName + " " + userData.value.lastName),
            username: userData.value.username,
            markdown: markdown.value,
            html: "<p>error</p>",
            description: description.value,
            thumbnail: thumbnail.value,
            mime: mime.value,
            keywords: keywords.value.trim(),
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

    const previewMarkdown = async () => {
        if(!toggleHtmlPreview.value) {
            const getHtmlRes = await convertMarkdownToHTML(markdown.value);
            htmlPreview.value = getHtmlRes.html;
            route.push({ name: "NewBlogPreview", params: { html: htmlPreview.value} });
        } 

        toggleHtmlPreview.value = !(toggleHtmlPreview.value);
    }

    const submit = async () => {
        const newPost = await blogStore.uploadNewBlogPost(newPostData)
            .catch((err) => {
                alert(err);
            });

        if(newPost) {
            route.push({ name: "BlogPost", params: { id: newPost._id } });
        }

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
                    
                    <label for="post-description">Description:</label><br/>
                    <input type="text" name="description" v-model="description" id="post-description"/>
                    
                    <br/><br/>

                    <label for="input-thumbnail">Thumbnail:</label><br/>
                    <input type="file" name="thumbnail" @change="readFile" id="input-thumbnail"/>
                    
                    <br/><br/>

                    <label for="post-keywords">Keywords:</label><br/>
                    <input type="text" name="keywords" v-model="keywords" id="post-keywords"/>
                    
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
                
                <label v-if="!toggleHtmlPreview" for="post-markdown">Markdown:</label>
                <span v-else>HTML:</span>
                
                <br/>
                
                <textarea v-if="!toggleHtmlPreview" name="markdown" rows="20" cols="120" v-model="markdown" id="post-markdown"></textarea>
                <router-view v-else/>
                
                <br/><br/>
                
                <div class="two-col">
                    <input type="button" name="submit" value="submit" @click="submit"/>

                    <input type="button" 
                        name="preview" 
                        :value="(toggleHtmlPreview) ? 'back' : 'preview'" 
                        @click="previewMarkdown" 
                        />
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

    @media only screen and (max-width: 720px) {
        .two-col {
            flex-direction: column;
        }
    }
</style>
