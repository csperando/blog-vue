import BlogList from "../views/blog/list.vue";
import BlogPost from "../views/blog/post.vue";
import BlogWrite from "../views/blog/write.vue";
import BlogEdit from "../views/blog/edit.vue";

import BlogPreview from "../views/blog/preview.vue";

export const blogListRoute = {
    path: "/blog", 
    name: "Blog", 
    component: BlogList,
    props: true,
};

export const blogPostSlugRoute = {
    path: "/blog/:slug",
    component: BlogPost,
    props: (route) => { route.params },
};

export const blogPostRoute = {
    path: "/blog/:id",
    name: "BlogPost",
    component: BlogPost,
    props: (route) => { route.params },
};

export const blogWriteRoute = {
    path: "/blog/write",
    name: "BlogWrite",
    component: BlogWrite,
    props: false,
    children: [
        {
            path: "/blog/write/preview/:html?",
            name: "NewBlogPreview",
            component: BlogPreview,
            props: (route) => { route.params },
            meta: { requiresAuth: true },
        }
    ],
    meta: { requiresAuth: true },
};

export const blogEditRoute = {
    path: "/blog/edit/:id",
    name: "BlogEdit",
    component: BlogEdit,
    props: (route) => { route.params },
    children: [
        {
            path: "/blog/edit/:id/preview/:html?",
            name: "EditedBlogPreview",
            component: BlogPreview,
            props: (route) => { route.params },
            meta: { requiresAuth: true },
        }
    ],
    meta: { requiresAuth: true },
};
