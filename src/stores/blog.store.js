
import { defineStore } from "pinia";
import { base_path } from "../config";

import { fetchRecentBlogPosts, fetchBlogByID, uploadNewBlogPost } from "../services/blog.service";

export const initBlogStore = defineStore("blogStore", {
    // state
    state: () => {
        return {
            currentBlogPost: null,
            recentBlogPosts: null,
        }
    },

    // getters
    getters: {
        getCurrentBlogPost: (state) => (state.currentBlogPost),
        getRecentBlogPosts: (state) => (state.recentBlogPosts),
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
        }
    }
});
