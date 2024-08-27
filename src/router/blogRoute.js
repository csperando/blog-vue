import BlogList from "../views/blog/list.vue";
import BlogPost from "../views/blog/post.vue";
import BlogWrite from "../views/blog/write.vue";

export const blogListRoute = {
    path: "/blog", 
    name: "Blog", 
    component: BlogList,
    props: true,
};

export const blogPostRoute = {
    path: "/blog/:title/:html/:author",
    name: "BlogPost",
    component: BlogPost,
    props: (route) => { route.params }
};

export const blogWriteRoute = {
    path: "/blog/edit",
    name: "BlogWrite",
    component: BlogWrite,
    props: false
};
