import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/product',
    component: () => import('../views/Product.vue'),
    name: 'product',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
