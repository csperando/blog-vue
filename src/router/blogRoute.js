import BlogList from "../views/blog/list.vue";
import BlogPost from "../views/blog/post.vue";

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
