import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MxContainer from '../components/container/src/container.vue'
import Home from '../views/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MxContainer,
    children: [{ path: '/', component: Home }]
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
