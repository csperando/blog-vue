<script setup>
    import { base_path } from "../../config";
    import { ref, computed } from "vue";
    import { useRouter } from 'vue-router';
    import postTile from "../../components/postTile.vue";

    const route = useRouter();

    const title = ref("");
    const author = ref("Coleman Sperando");
    const markdown = ref("");
    const description = ref("");

    // file inputs cannot use v-model
    const thumbnailBase64 = ref("");
    const thumbnailMimeType = ref("");

    const newPostData = computed(() => {
        return { title: title.value, author: author.value, markdown: markdown.value, html: "<p>error</p>", description: description.value };
    });

    const readFile = async (event) => {
        try {
            // Preview image file on upload
            const imageData = document.getElementById("input-thumbnail").files[0] || null;
            thumbnailMimeType.value = imageData.type;
            const b = await imageData.arrayBuffer();

            let base64String = "";
            let bytes = new Uint8Array(b);
            let l = bytes.byteLength;
            for(let i = 0; i < l; i++) {
                base64String += String.fromCharCode(bytes[i]);
            }
            base64String = btoa(base64String);
            
            thumbnailBase64.value = base64String;
        } catch(err) {
            console.error(err);
        }
    }

    const preview = () => {
        console.log("preview");
    }

    const submit = async () => {

        // Generate a .md markup file from the ser input
        // Store markup and other meta data in form data object
        const blob = new Blob([newPostData.value.markdown], { type: "text/plain;charset=utf-8" });
        const markdownFile = new File([blob], 'test.md', { type: "text/plain" });
        const data = new FormData();
        data.append("author", newPostData.value.author);
        data.append("html", newPostData.value.html);
        data.append("title", newPostData.value.title);
        data.append("description", newPostData.value.description);
        data.append("markdown", markdownFile);

        // thumbnail
        const imageData = document.getElementById("input-thumbnail").files[0] || null;
        data.append("thumbnail", imageData);

        // Generate http request data
        // POST form data to create a new post
        // TODO - Handle any errors
        const endpoint = base_path + "/blog/new";
        const options = {
            method: "POST",
            // headers: { "content-type": "multipart/form-data" }, // DO NOT INCLUDE
            headers: { "x-auth-token": localStorage.getItem("token") },
            body: data
        };

        // submit request for new blog post
        const res = await fetch(endpoint, options)
            .then((res) => {
                return res.json();
            }).then((res) => {
                return res;
            }).catch((err) => {
                console.error(err);
            });
            
        // redirect to new blog psot page if successfull
        if(res.status == 200) {
            route.push({ name: "BlogPost", params: res.data });
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
