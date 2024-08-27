<script setup>
    import { ref, computed } from "vue";

    const title = ref("");
    const author = ref("");
    const markdown = ref("");

    const newPostData = computed(() => {
        return { title: title.value, author: author.value, markdown: markdown.value };
    });

    const submit = async () => {
        // TODO
        return;

        const endpoint = "https://csperando-blog-rest-frdyhdcjh9ddfhb2.eastus-01.azurewebsites.net/blog/new";
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newPostData.value)
        };

        // console.log(options);

        const res = await fetch(endpoint, options)
            .then((res) => {
                return res.json();
            }).catch((err) => {
                console.error(err);
            });

        // console.log(res);
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
