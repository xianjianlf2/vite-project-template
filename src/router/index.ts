import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MxContainer from '../components/container/src/container.vue'
import Home from '../views/home.vue'
import Form from '../views/form.vue'
import Table from '../views/table.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MxContainer,
    children: [
      { path: '/', component: Home },
      { path: '/form', component: Form },
      { path: '/table', component: Table }
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
