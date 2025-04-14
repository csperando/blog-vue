import SeriesList from "../views/series/index.vue";
import SeriesDetails from "../views/series/series.vue";

export const seriesListRoute = {
    path: "/series", 
    name: "Series", 
    component: SeriesList,
    props: (route) => { route.query },
};

export const seriesByNameRoute = {
    path: "/", 
    name: "SeriesByName", 
    component: SeriesDetails,
    props: (route) => { route.query },
};
