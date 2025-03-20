
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

export const fetchTopKeywords = async () => {
    try {
        const endpoint = base_path + "/blog/keywords";
        
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

export const fetchBlogBySlug = async (slug) => {
    try {
        const endpoint = base_path + "/blog/findBySlug/" + slug;
        
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

export const fetchBlogByID = async (id) => {
    try {
        const endpoint = base_path + "/blog/find/" + id;
        
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

export const fetchBlogsByKeyword = async (keyword) => {
    try {
        const endpoint = base_path + "/blog/find?keyword=" + encodeURIComponent(keyword);
        
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
        data.append("username", newPostData.value.username);
        data.append("html", newPostData.value.html);
        data.append("title", newPostData.value.title);
        data.append("description", newPostData.value.description);
        data.append("thumbnail", newPostData.value.thumbnail);
        data.append("mime", newPostData.value.mime);
        data.append("markdown", markdownFile);
        
        // add keywords string if truthy, parsed as an array on the API side
        if(newPostData.value.keywords) {
            data.append("keywords", newPostData.value.keywords);
        }

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
                    throw new Error(res.message);
                }
                
                return res.data;
            });

    } catch(err) {
        throw(err);
    }
}

export const uploadEditedBlogPost = async (newPostData, id) => {
    try {
        // Generate a .md markup file from the ser input
        const markdownFile = generateMarkdownFile(newPostData.value.markdown);

        // Store markup and other meta data in form data object
        const data = new FormData();
        data.append("author", newPostData.value.author);
        data.append("username", newPostData.value.username);
        data.append("html", newPostData.value.html);
        data.append("title", newPostData.value.title);
        data.append("description", newPostData.value.description);
        data.append("thumbnail", newPostData.value.thumbnail);
        data.append("mime", newPostData.value.mime);
        data.append("markdown", markdownFile);
        
        // add keywords string if truthy, parsed as an array on the API side
        if(newPostData.value.keywords) {
            data.append("keywords", newPostData.value.keywords);
        }

        // Generate http request data
        // POST form data to create a new post
        // TODO - Handle any errors
        const endpoint = base_path + "/blog/edit/" + id;
        const options = {
            method: "PUT",
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
                    throw new Error(res.message);
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
