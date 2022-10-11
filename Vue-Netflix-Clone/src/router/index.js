import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue';
import { useAuthStore } from '../stores/authStore';
const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: {
      auth: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    meta: {
      auth: false,
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import("../views/Home.vue"),
    meta: {
      auth: true
    }
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component: () => import("../views/Movie.vue"),
    meta: {
      auth: true
    }
  },
  {
    path: '/list',
    name: 'list',
    component: () => import("../views/List.vue"),
    meta: {
      auth: true
    }
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
});

const currentUser = () => {
  return new Promise((resolve, reject) => {
    const authStore = useAuthStore();
    const token = authStore.userData;
    resolve(token);
    reject
  })
}

router.beforeEach( async (to, from, next) => {
  if(to.matched.some((record) => record.meta.auth)) {
    if(await currentUser()) {
      next();
    } else {
      next("/")
    }
  } else {
    next();
  }
})


export default router;

