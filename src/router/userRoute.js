import ProfileView from "../views/profile.vue";
import LoginView from "../views/login.vue";

export const profileRoute = {
    path: "/profile", 
    name: "Profile", 
    component: ProfileView 
};

export const loginRoute = {
    path: "/login", 
    name: "Login", 
    component: LoginView 
};

