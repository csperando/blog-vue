import { defineStore } from "pinia";

// TODO configuration
const restHost = "http://192.168.1.230:8080";

export const useBlogStore = defineStore("blogStore", {
    state: () => {
        return {
            restHost: "http://192.168.1.230:8080",
            blogs: []
        }
    },
    getters: {

    },
    actions: {
        async getPosts () {
            const res = await fetch(restHost + "/blog")
                .then((res) => {
                    return res.json();

                }).then((res) => {
                    if(res.status == 200) {
                        return res.data;
                    } else {
                        return [];
                    }

                }).catch((err) => {
                    // console.log(err);

                });
            
            this.blogs = res;
        }
    }
});
