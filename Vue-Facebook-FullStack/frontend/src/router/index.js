import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
const routes = [
    {
        path: "/",
        name: "login",
        component: Login
    },

    {
        path: "/register",
        name: "register",
        component: () => import("../views/Register.vue")
    },

    {
        path: "/home",
        name: "home",
        component: () => import("../views/Home.vue")
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

export default router;