import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Products from '@/views/Products.vue';
import Error from '@/views/Error.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'products',
    component: Products
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error',
    component: Error
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
