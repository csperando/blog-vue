import { createRouter, createWebHistory } from "vue-router";

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

    // requires auth
    blogs.blogWriteRoute,
    blogs.blogEditRoute,
    loginRoute,
    profileRoute,

    // not found
    errors.notFound,
    errors.notAllowed,
];

export const router = createRouter({
    history: createWebHistory("/blog-vue/"),
    routes: routes,
});

router.beforeEach((to) => {
    const userStore = initUserStore();

    if(to.meta.requiresAuth && !userStore.getLoggedIn) {
        return { name: "NotAllowed" };
    }
});
