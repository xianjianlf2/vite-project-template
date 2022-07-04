import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MxContainer from '../components/container/src/container.vue'
import Home from '../views/Home.vue'
import Form from '../views/Form.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MxContainer,
    children: [
      { path: '/', component: Home },
      { path: '/form', component: Form }
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
