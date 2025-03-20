import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";

// static routes and error pages
import { homeRoute } from "./homeRoute.js";
import { aboutRoute } from "./aboutRoute.js";
import * as errors from "./errorRoute.js";

// dynamic routes
import * as blogs from "./blogRoute.js";
import { profileRoute, loginRoute } from "./userRoute.js";

// for auth
import { initUserStore } from "../stores/user.store.js";

// setup routes
const routes = [
    // static
    aboutRoute,
    homeRoute,
    
    // blogs
    blogs.blogPostSlugRoute,
    blogs.blogListRoute,
    blogs.blogPostRoute,
    
    // blogs -requires auth
    blogs.blogWriteRoute,
    blogs.blogEditRoute,
    
    // user
    loginRoute,
    // user - requires auth
    profileRoute,

    // errors
    errors.notFound,
    errors.notAllowed,
];

export const router = createRouter({
    history: createWebHashHistory("/blog-vue/"),
    routes: routes,
});

router.beforeEach((to) => {
    const userStore = initUserStore();

    if(to.meta.requiresAuth && !userStore.getLoggedIn) {
        return { name: "NotAllowed" };
    }
});
