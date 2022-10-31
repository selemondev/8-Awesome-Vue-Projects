import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Login from "../views/Login.vue";
const routes = [
    {
        path: "/",
        name: "login",
        component: Login,
        meta: {
            auth: false,
        }
    },

    {
        path: "/register",
        name: "register",
        component: () => import("../views/Register.vue"),
        meta: {
            auth: false,
        }
    },

    {
        path: "/profile",
        name: "profile",
        component: () => import("../views/Profile.vue"),
        meta: {
            auth: true,
        }
    },

    {
        path: "/feed",
        name: "feed",
        component: () => import("../views/Feed.vue"),
        meta: {
            auth: true,
        }
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
});


const currentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        },
            reject
        )
    })
};

router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.auth)) {
        if (await currentUser()) {
            next();
        } else {
            next("/");
        }
    } else {
        next();
    }
});

export default router;