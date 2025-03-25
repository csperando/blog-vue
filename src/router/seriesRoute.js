import SeriesView from "@/views/series/index.vue";

export const seriesListRoute = {
    path: "/", 
    name: "Series", 
    component: SeriesView,
    props: (route) => { route.query },
};
