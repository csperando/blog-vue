
import { defineStore } from "pinia";
import { base_path } from "../config";

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
                const endpoint = base_path + "/blog";

                const blogs = await fetch(endpoint)
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
                
                this.recentBlogPosts = blogs;
            } catch(err) {
                console.error(err);
            }
        }
    }
});
