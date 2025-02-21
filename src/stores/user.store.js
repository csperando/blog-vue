import { defineStore } from "pinia";
import { validateToken, fetchUserData, fetchUserPosts, login } from "../services/user.service";

export const initUserStore = defineStore("userStore", {
    // state
    state: () => {
        return {
            loggedIn: false,
            userData: null,
            userPosts: null,
        }
    },

    // getters
    getters: {
        getLoggedIn: (state) => (state.loggedIn),
        getUserData: (state) => (state.userData),
        getUserPosts: (state) => (state.userPosts),
    },

    // actions
    actions: {
        async fetchUserData(userid) {
            try {
                const userData = await fetchUserData(userid);
                return userData;

            } catch(err) {
                console.error(err);
            }
        },

        async validateToken() {
            const token = localStorage.getItem("token");

            if(!token) {
                return false;
            }
            
            // validate token and update user data
            const res = await validateToken(token);
            if(res.status == 200) {
                this.loggedIn = true;
                this.userData = res.data;
            } else {
                localStorage.setItem("token", "");
            }

            // additional user data
            const posts = await fetchUserPosts(this.userData._id || "error");
            if(posts.status == 200) {
                this.userPosts = posts.data;
            }
            
            return true;
        },

        async login(username, password) {
            try {
                const res = await login(username, password);
                
                if(res.status == 200) {
                    this.loggedIn = true;
                    this.userData = res.data;
                    localStorage.setItem("token", res.data.token);
                    return true;
                }

            } catch(err) {
                return err;
            }
        },

        logout() {
            this.loggedIn = false;
            this.userData = null;
            localStorage.setItem("token", "");
        }
    }
});
