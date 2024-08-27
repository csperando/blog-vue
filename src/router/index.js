import { createMemoryHistory, createRouter } from "vue-router";

import { homeRoute } from "./homeRoute.js";
import { aboutRoute } from "./aboutRoute.js";
import { blogPostRoute, blogListRoute, blogWriteRoute } from "./blogRoute.js";
import { profileRoute } from "./profileRoute.js";

const routes = [
    homeRoute,
    aboutRoute,
    blogListRoute,
    blogPostRoute,
    profileRoute,
    blogWriteRoute
];

export const router = createRouter({
    history: createMemoryHistory(),
    routes: routes,
});
