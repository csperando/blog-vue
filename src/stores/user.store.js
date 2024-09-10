import { defineStore } from "pinia";

export const initUserStore = defineStore("userStore", {
    // state
    state: () => {
        return {
            loggedIn: false,
            userData: null,
        }
    },

    // getters
    getters: {
        getLoggedIn: (state) => (state.loggedIn),
        getUserData: (state) => (state.userData),
    },

    // actions
    actions: {
        async fetchUserData() {
            try {
                return {};

                // const endpoint = "https://csperando-blog-rest-frdyhdcjh9ddfhb2.eastus-01.azurewebsites.net/blog";
                // const endpoint = "http://localhost:3000/blog";

                // return await fetch(endpoint)
                //     .then((res) => {
                //         return res.json();
                //     })
                //     .then((res) => {
                //         if(res.status != 200) {
                //             throw new Error("Failed to get blog data");
                //         }

                //         return res.data;
                //     }).catch((err) => {
                //         console.error(err);
                //     });

            } catch(err) {
                console.error(err);
            }
        }
    }
});
