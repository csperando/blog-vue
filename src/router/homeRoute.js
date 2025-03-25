import HomeView from "../views/home.vue";

export const homeRoute = {
    path: "/", 
    name: "Home", 
    component: HomeView, 
    props: true,
    beforeEnter: (to) => {
        if(to.query.blog) {
            return { name: "BlogPostByName", query: to.query };
        }

        if(to.query.series) {
            return { name: "Series", query: to.query };
        }
    }
};
