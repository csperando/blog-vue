
import { defineStore } from "pinia";
import { base_path } from "../config";

// import * from "../services/blog.service";
import { fetchRecentBlogPosts, fetchBlogByID, uploadNewBlogPost, fetchTopKeywords, fetchBlogsByKeyword } from "../services/blog.service";

export const initBlogStore = defineStore("blogStore", {
    // state
    state: () => {
        return {
            currentBlogPost: null,
            recentBlogPosts: null,
            topKeywords: null,
            blogsByTopKeyword: null,
        }
    },

    // getters
    getters: {
        getCurrentBlogPost: (state) => (state.currentBlogPost),
        getRecentBlogPosts: (state) => (state.recentBlogPosts),
        getTopKeywords: (state) => (state.topKeywords),
        getBlogsByTopKeyword: (state) => (state.blogsByTopKeyword),
    },

    // actions
    actions: {
        async fetchRecentBlogPosts() {
            try {
                const blogs = await fetchRecentBlogPosts();
                this.recentBlogPosts = blogs;

            } catch(err) {
                console.error(err);
                throw(err);
            }
        },

        async uploadNewBlogPost(newPostData) {
            try {
                // try to upload new post data
                const newPost = await uploadNewBlogPost(newPostData);

                // if successfull, update recent blog posts
                this.recentBlogPosts.push(newPost);

                // finally return the new post data
                return newPost;

            } catch(err) {
                console.error(err);
                throw(err);
            }
        },

        async fetchBlogByID(id) {
            try {
                const p = await fetchBlogByID(id);
                this.currentBlogPost = p;
                return p;

            } catch(err) {
                console.error(err);
                throw(err);
            }
        },
        
        async fetchTopKeywords() {
            try {
                const keys = await fetchTopKeywords();
                this.topKeywords = keys;
                
                if(keys.length) {
                    await this.fetchBlogsByKeyword(keys[0]._id);
                }

                return keys;

            } catch(err) {
                console.error(err);
                throw(err);
            }
        },

        async fetchBlogsByKeyword(keyword) {
            try {
                const p = await fetchBlogsByKeyword(keyword);
                this.blogsByTopKeyword = p;
                return p;

            } catch(err) {
                console.error(err);
                throw(err);
            }
        },
    }
});
