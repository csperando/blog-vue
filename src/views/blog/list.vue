<script setup>
    const blogRes = await fetch("https://csperando-blog-rest-frdyhdcjh9ddfhb2.eastus-01.azurewebsites.net/blog")
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            if(res.status != 200) {
                throw new Error("Failed to get blog data");
            }

            return res.data;
        }).catch((err) => {
            console.error(err);
        });

    // console.log(blogRes);
</script>

<template>
    <div>
        <p>Most Recent:</p>

        <br/>

        <ul>
            <li v-for="blog in blogRes">
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
</template>
