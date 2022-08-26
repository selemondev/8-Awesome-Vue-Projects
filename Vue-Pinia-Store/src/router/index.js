import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/Cart.vue')
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('../views/Product.vue')
    },
  ]
})

export default router
