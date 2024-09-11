<script setup>
    import { base_path } from "../../config";
    import { ref, computed } from "vue";
    import { useRouter } from 'vue-router';

    const route = useRouter();

    const title = ref("");
    const author = ref("");
    const markdown = ref("");

    const newPostData = computed(() => {
        return { title: title.value, author: author.value, markdown: markdown.value, html: "<p>test</p>" };
    });

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
        <p>Write markdown here</p>

        <br/>

        <form>

            <label for="title">Title:</label><br/>
            <input type="text" name="title" v-model="title"/>
            
            <br/><br/>
            
            <label for="author">Author:</label><br/>
            <input type="text" name="author" v-model="author"/>
            
            <br/><br/>

            <label for="markdown">Markdown:</label><br/>
            <textarea name="markdown" rows="20" cols="120" v-model="markdown"></textarea>

            <br/><br/>

            <input type="button" name="submit" value="submit" @click="submit"/>

        </form>
    </section>
</template>
