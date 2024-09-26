import BlogList from "../views/blog/list.vue";
import BlogPost from "../views/blog/post.vue";
import BlogWrite from "../views/blog/write.vue";
import BlogPreview from "../views/blog/preview.vue";

export const blogListRoute = {
    path: "/blog", 
    name: "Blog", 
    component: BlogList,
    props: true,
};

export const blogPostRoute = {
    // todo - replace all props with _id
    path: "/blog/:title/:html?/:author/:description?/:created?/:thumbnail?/:mime?",
    name: "BlogPost",
    component: BlogPost,
    props: (route) => { route.params }
};

export const blogWriteRoute = {
    path: "/blog/edit",
    name: "BlogWrite",
    component: BlogWrite,
    props: false,
    children: [
        {
            path: "/blog/edit/preview/:html?",
            name: "BlogPreview",
            component: BlogPreview,
            props: (route) => { route.params },
        }
    ]
};
