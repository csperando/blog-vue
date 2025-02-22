import { createMemoryHistory, createRouter } from "vue-router";

import { homeRoute } from "./homeRoute.js";
import { aboutRoute } from "./aboutRoute.js";
import { blogPostRoute, blogListRoute, blogWriteRoute, blogEditRoute } from "./blogRoute.js";
import { profileRoute, loginRoute } from "./userRoute.js";

const routes = [
    homeRoute,
    aboutRoute,

    loginRoute,
    profileRoute,

    blogListRoute,
    blogPostRoute,
    blogWriteRoute,
    blogEditRoute,
];

export const router = createRouter({
    history: createMemoryHistory(),
    routes: routes,
});
