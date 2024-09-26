
import { base_path } from "../config";

const generateMarkdownFile = (markdownString) => {
    const blob = new Blob([markdownString], { type: "text/plain;charset=utf-8" });
    const markdownFile = new File([blob], 'test.md', { type: "text/plain" });
    return markdownFile;
};

export const fetchRecentBlogPosts = async () => {
    try {
        const endpoint = base_path + "/blog";
        
        return await fetch(endpoint)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if(res.status != 200) {
                    throw new Error("Failed to get blog data");
                }

                return res.data;
            });

    } catch(err) {
        throw(err);
    }
}

export const uploadNewBlogPost = async (newPostData) => {
    try {
        // Generate a .md markup file from the ser input
        const markdownFile = generateMarkdownFile(newPostData.value.markdown);
        
        // Store markup and other meta data in form data object
        const data = new FormData();
        data.append("author", newPostData.value.author);
        data.append("html", newPostData.value.html);
        data.append("title", newPostData.value.title);
        data.append("description", newPostData.value.description);
        data.append("thumbnail", newPostData.value.thumbnail);
        data.append("mime", newPostData.value.mime);
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
        return await fetch(endpoint, options)
            .then((res) => {
                return res.json();
            }).then((res) => {
                if(res.status != 200) {
                    throw new Error("Failed to get blog data");
                }
                
                return res.data;
            });

    } catch(err) {
        throw(err);
    }
}

export const convertMarkdownToHTML = async (markdownString) => {
    try {
        const endpoint = base_path + "/blog/markdown";
        const markdownFile = generateMarkdownFile(markdownString);
        const data = new FormData();
        data.append("markdown", markdownFile);
        const options = { method: "POST", headers: { "x-auth-token": localStorage.getItem("token") }, body: data };

        return await fetch(endpoint, options)
            .then((res) => {
                return res.json();
            }).then((res) => {
                if(res.status != 200) {
                    throw new Error("Failed to convert markdown to html");
                }
                
                return res.data;
            });

    } catch(err) {
        throw(err);
    }
}
