
import { defineStore } from "pinia";

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
                // const endpoint = "https://csperando-blog-rest-frdyhdcjh9ddfhb2.eastus-01.azurewebsites.net/blog";
                const endpoint = "http://localhost:3000/blog";

                return await fetch(endpoint)
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

            } catch(err) {
                console.error(err);
            }
        }
    }
});
