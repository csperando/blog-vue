import { defineStore } from "pinia";
import { validateToken, login } from "../services/user.service";

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

            } catch(err) {
                console.error(err);
            }
        },

        async validateToken() {
            const token = localStorage.getItem("token");

            if(!token) {
                return false;
            }
            
            const res = await validateToken(token);
            
            if(res.status == 200) {
                this.loggedIn = true;
                this.userData = res.data;
                return true;
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
