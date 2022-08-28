import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
const routes = [
    {
        path: "/",
        name: "login",
        component: Login
    },
    {
        path: "/register",
        name: "register",
        component: Register
    },
    {
        path: "/home",
        name: "home",
        component: () => import("../views/Home.vue"),
    },
    {
        path:"/chat",
        name: "chat",
        component: () => import("../views/Chat.vue"),
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;