import NotFoundView from "../views/notFound.vue";
import NotAllowedView from "../views/notAllowed.vue";

export const notFound = { 
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView
};

export const notAllowed = { 
    path: "/error", 
    name: "NotAllowed", 
    component: NotAllowedView 
};
