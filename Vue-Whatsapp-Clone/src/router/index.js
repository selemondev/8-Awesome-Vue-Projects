import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
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
        component: Register,
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
        path:"/chat",
        name: "chat",
        component: () => import("../views/Chat.vue"),
        meta: {
            auth: true,
        }
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
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
  
  router.beforeEach( async (to,from,next) => {
    if(to.matched.some((record) => record.meta.auth)) {
      if(await currentUser()) {
        next();
      } else {
        next("/");
      }
    } else {
      next();
    }
  });
export default router;