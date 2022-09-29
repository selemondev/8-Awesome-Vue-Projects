import { createRouter , createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes
});


export default router;