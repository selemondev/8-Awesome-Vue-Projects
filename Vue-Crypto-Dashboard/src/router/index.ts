import { createRouter , createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    
    {
        path: "/coinView",
        name: "CoinView",
        component: () => import("../views/CoinView.vue")
    },

    {
        path: "/newsView",
        name: "NewsView",
        component: () => import("../views/NewsView.vue")
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes
});


export default router;