
import { defineStore } from "pinia";
import { base_path } from "../config";

import * as BlogServices from "../services/blog.service";

export const initBlogStore = defineStore("blogStore", {
    // state
    state: () => {
        return {
            BlogServices: BlogServices,
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
                const blogs = await this.BlogServices.fetchRecentBlogPosts();
                this.recentBlogPosts = blogs;

            } catch(err) {
                console.error(err);
                throw(err);
            }
        },

        async uploadNewBlogPost(newPostData) {
            try {
                // try to upload new post data
                const newPost = await this.BlogServices.uploadNewBlogPost(newPostData);

                // if successfull, update recent blog posts
                this.recentBlogPosts.push(newPost);

                // finally return the new post data
                return newPost;

            } catch(err) {
                console.error(err);
                throw(err);
            }
        },

        async uploadEditedBlogPost(newPostData, id) {
            try {
                // try to upload new post data
                const editedPost = await this.BlogServices.uploadEditedBlogPost(newPostData, id);

                // finally return the new post data
                return editedPost;

            } catch(err) {
                console.error(err);
                throw(err);
            }
        },

        async fetchBlogBySlug(slug) {
            try {
                const p = await this.BlogServices.fetchBlogBySlug(slug);
                this.currentBlogPost = p;
                return p;

            } catch(err) {
                console.error(err);
                throw(err);
            }
        },
        
        async fetchBlogByID(id) {
            try {
                const p = await this.BlogServices.fetchBlogByID(id);
                this.currentBlogPost = p;
                return p;

            } catch(err) {
                console.error(err);
                throw(err);
            }
        },
        
        async fetchTopKeywords() {
            try {
                const keys = await this.BlogServices.fetchTopKeywords();
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
                const p = await this.BlogServices.fetchBlogsByKeyword(keyword);
                this.blogsByTopKeyword = p;
                return p;

            } catch(err) {
                console.error(err);
                throw(err);
            }
        },
    }
});
