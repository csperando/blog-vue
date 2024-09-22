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

    const newPostData = computed(() => {
        return { title: title.value, author: author.value, markdown: markdown.value, html: "<p>test</p>" };
    });

    const readFile = async (event) => {
        console.log(event);
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
        data.append("markdown", markdownFile);

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
                    <label for="title">Title:</label><br/>
                    <input type="text" name="title" v-model="title"/>
                    
                    <br/><br/>
                    
                    <label for="author">Author:</label><br/>
                    <input type="text" name="author" v-model="author" readonly/>
                    
                    <br/><br/>
                    
                    <label for="description">Description:</label><br/>
                    <input type="text" name="description" v-model="description"/>
                    
                    <br/><br/>

                    <label for="thumbnail">Thumbnail:</label><br/>
                    <input type="file" name="thumbnail" @change="readFile"/>
                    
                    <br/><br/>
                </div>
            
                <postTile class="preview"
                    :title="title"
                    :timestamp="`${new Date()}`"
                    :description="description"
                    :thumbnail="''"
                    />
            </div>

            <div>
                <br/><br/>
                
                <label for="markdown">Markdown:</label><br/>
                <textarea name="markdown" rows="20" cols="120" v-model="markdown"></textarea>
                
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
