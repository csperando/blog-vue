import HomeView from "../views/home.vue";

export const homeRoute = {
    path: "/", 
    name: "Home", 
    component: HomeView, 
    props: true,
    beforeEnter: (to) => {
        if(to.query.blog) {
            return { path: "/blog/" + to.query.blog };
        }
    }
};
