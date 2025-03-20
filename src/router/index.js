import { createMemoryHistory, createRouter, createWebHistory } from "vue-router";

import { homeRoute } from "./homeRoute.js";
import { aboutRoute } from "./aboutRoute.js";

import * as blogs from "./blogRoute.js"; // { blogPostRoute, blogListRoute, blogWriteRoute, blogEditRoute } from "./blogRoute.js";
import { profileRoute, loginRoute } from "./userRoute.js";

const routes = [
    blogs.blogPostSlugRoute,
    
    aboutRoute,
    homeRoute,

    loginRoute,
    profileRoute,

    blogs.blogListRoute,
    blogs.blogPostRoute,
    blogs.blogWriteRoute,
    blogs.blogEditRoute,
];

export const router = createRouter({
    history: createWebHistory("/blog-vue/"),
    routes: routes,
});
