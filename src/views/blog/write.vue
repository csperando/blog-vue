<script setup>
    import { base_path } from "../../config";
    import { ref, computed, inject } from "vue";
    import { storeToRefs } from 'pinia';
    import { useRouter } from 'vue-router';
    
    import progressTabs from "../../components/progressTabs.vue";
    import postTile from "../../components/postTile.vue";
    import textInput from "../../components/form/textInput.vue";
    import fileInput from "../../components/form/fileInput.vue";
    import { convertMarkdownToHTML } from "../../services/blog.service";

    const route = useRouter();
    const blogStore = inject('blogStore');
    const userStore = inject('userStore');
    let { userData } = storeToRefs(userStore);

    // form ui
    const activeSection = ref(1);

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

    const submit = async (e) => {
        e.preventDefault();

        const newPost = await blogStore.uploadNewBlogPost(newPostData)
            .catch((err) => {
                alert(err);
            });

        if(newPost) {
            route.push({ name: "BlogPost", params: { id: newPost._id } });
        }

    }

    const updateTitle = (input) => {
        title.value = input.value;
    }
    
    const updateDescription = (input) => {
        description.value = input.value;
    }
    
    const updateKeywords = (input) => {
        keywords.value = input.value;
    }

    const updateTab = function(sectionNumber) {
        activeSection.value = sectionNumber;
    }

    const progress = function(direction) {
        updateTab(activeSection.value + direction);
    }

</script>

<template>
    <section>
        <h1 class="p-8">Create a new blog post</h1>

        <progress-tabs :active="activeSection" :data="['Metas', 'Series', 'Content']" @update="updateTab"/>

        <form class="p-8 flex flex-col">
            <div v-show="activeSection == 1" class="relative flex w-full justify-center items-center gap-[50px] sm:flex-col lg:flex-row">
                <div>
                    <text-input name="title" :value="title" label="Title:" id="post-title" @update-text-input="updateTitle"/>
                    <br/>
                    <text-input name="description" :value="description" label="Description:" id="post-description" @update-text-input="updateDescription"/>
                    <br/>
                    <file-input name="thumbnail" :value="thumbnail" label="Thumbnail:" id="input-thumbnail" @update-file-input="readFile"/>
                    <br/>
                    <text-input name="keywords" :value="keywords" label="Keywords:" id="post-keywords" @update-text-input="updateKeywords"/>
                    <br/>      
                </div>
            
                <div class="relative flex flex-row justify-center items-center">
                    <postTile
                        :title="title"
                        :timestamp="`${new Date()}`"
                        :description="description"
    
                        :preview="true"
                        :thumbnailBase64="thumbnailBase64"
                        :thumbnailMimeType="thumbnailMimeType"
    
                        :isLink="false"
                        />
                </div>
            </div>

            <div v-show="activeSection == 2">
                <p>Todo</p>
            </div>

            <div v-show="activeSection == 3">
                <br/><br/>
                
                <label v-if="!toggleHtmlPreview" for="post-markdown">Markdown:</label>
                <span v-else>HTML:</span>
                
                <br/>
                
                <textarea v-if="!toggleHtmlPreview" class="outline m-4 p-4" name="markdown" rows="20" cols="120" v-model="markdown" id="post-markdown"></textarea>
                <router-view v-else/>
                
                <br/><br/>
                
            </div>
            
            <div v-if="activeSection == 3" class="mt-8 relative flex flex-row w-full justify-center items-start gap-[20px]">
                <div v-if="activeSection > 1" class="flex flex-col items-center justify-center">
                    <input type="button" 
                        name="back" 
                        value="back" 
                        @click="progress(-1)" 
                        class="bg-indigo-500 hover:bg-indigo-700 hover:cursor-pointer text-white font-bold py-2 px-4 border border-indigo-700 rounded"/>
                </div>

                <div class="flex flex-col items-center justify-center">
                    <input type="button" 
                        name="submit" 
                        value="submit" 
                        @click="submit" 
                        class="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 border border-blue-700 rounded"/>
                </div>

                <div class="flex flex-col items-center justify-center">
                    <input type="button" 
                        name="preview" 
                        :value="(toggleHtmlPreview) ? 'back' : 'preview'" 
                        @click="previewMarkdown" 
                        class="bg-indigo-500 hover:bg-indigo-700 hover:cursor-pointer text-white font-bold py-2 px-4 border border-indigo-700 rounded"/>
                </div>
            </div>
            <div v-else class="mt-8 relative flex flex-row w-full justify-center items-start gap-[20px]">
                <div v-if="activeSection > 1" class="flex flex-col items-center justify-center">
                    <input type="button" 
                        name="back" 
                        value="back" 
                        @click="progress(-1)" 
                        class="bg-indigo-500 hover:bg-indigo-700 hover:cursor-pointer text-white font-bold py-2 px-4 border border-indigo-700 rounded"/>
                </div>

                <div class="flex flex-col items-center justify-center">
                    <input type="button" 
                        name="continue" 
                        value="continue" 
                        @click="progress(1)" 
                        class="bg-indigo-500 hover:bg-indigo-700 hover:cursor-pointer text-white font-bold py-2 px-4 border border-indigo-700 rounded"/>
                </div>
            </div>

        </form>
    </section>
</template>

<style scoped>

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
