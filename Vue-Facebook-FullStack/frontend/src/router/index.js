import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
const routes = [
    {
        path: "/",
        name: "login",
        component: Login
    },

    {
        path: "/register",
        name: "register",
        component: () => import("../pages/Register.vue")
    },

    {
        path: "/home",
        name: "home",
        component: () => import("../pages/Home.vue")
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

export default router;