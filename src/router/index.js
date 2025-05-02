import { createRouter, createWebHistory } from "vue-router";

// static routes and error pages
import { homeRoute } from "./homeRoute.js";
import { aboutRoute } from "./aboutRoute.js";
import * as errors from "./errorRoute.js";

// dynamic routes
import * as blogs from "./blogRoute.js";
import * as series from "./seriesRoute.js";
import { profileRoute, loginRoute } from "./userRoute.js";

// for auth
import { initUserStore } from "../stores/user.store.js";

// for dev/testing
const isDev = import.meta.env.DEV;
import TestView from "../views/test.vue";

// setup routes
const routes = [
    // static
    aboutRoute,

    // !!! includes redirect by blog/series slug
    homeRoute,
    
    // blogs
    blogs.blogPostSlugRoute,
    blogs.blogListRoute,
    blogs.blogPostRoute,
    
    // blogs -requires auth
    blogs.blogWriteRoute,
    blogs.blogEditRoute,

    // series
    series.seriesListRoute,
    series.seriesByNameRoute,
    
    // user
    loginRoute,
    // user - requires auth
    profileRoute,

    // errors
    errors.notFound,
    errors.notAllowed,
];

// for testing
if(isDev) {
    routes.push({
        path: "/test",
        component: TestView,
    });
}

export const router = createRouter({
    history: createWebHistory("/"),
    routes: routes,
});

router.beforeEach((to) => {
    const userStore = initUserStore();

    if(to.meta.requiresAuth && !userStore.getLoggedIn) {
        return { name: "NotAllowed" };
    }
});
