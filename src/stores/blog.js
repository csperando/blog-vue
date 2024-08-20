import { defineStore } from "pinia";

export const useBlogStore = defineStore("blog", {
    state: () => ({
        test: "test",
    }),

    getters: { 

    },

    actions: {
        log() {
            console.log(this.test);
        },
        getBlogPosts() {
            console.log("testing...");
        }
    }
});
