import { createMemoryHistory, createRouter } from "vue-router";

import { homeRoute } from "./homeRoute.js";
import { aboutRoute } from "./aboutRoute.js";
import { blogPostRoute, blogListRoute } from "./blogRoute.js";
import { profileRoute } from "./profileRoute.js";

const routes = [
    homeRoute,
    aboutRoute,
    blogListRoute,
    blogPostRoute,
    profileRoute
];

export const router = createRouter({
    history: createMemoryHistory(),
    routes: routes,
});
