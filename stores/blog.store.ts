import { createStore } from "vuex";
import axios from "axios";

export const blogStore = createStore({
    state() {
        return {
            count: 0,
            restHostname: "http://192.168.1.230:8080",
        };
    },
    
    mutations: {
        increment(state) {
            state.count++;
        },
    },

    actions: {
        async getBlogPosts() {
            try {
                const endpoint = this.state.restHostname + "/blog";
                const res = await axios.get(endpoint)
                    .then((res) => {
                        console.log(res);
                        return res.data;
                    }).catch((err) => {
                        console.log(err);
                    })
            } catch(err: any) {
                throw(err);
            }
        }
    }
});
