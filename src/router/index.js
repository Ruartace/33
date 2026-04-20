import { createRouter, createWebHistory } from 'vue-router'
import PlaceholderView from '../views/PlaceholderView.vue'
import Patentincoming from '../views/Patentincoming/index.vue'
import Trademarkincoming from '../views/Trademarkincoming/index.vue'

const routes = [
  { path: '/', redirect: '/patent/electronic' },
  {
    path: '/patent/electronic',
    name: 'patent-electronic',
    component: Patentincoming,
    meta: { title: '专利电子来文' },
  },
  {
    path: '/patent/no-action',
    name: 'patent-no-action',
    component: PlaceholderView,
    meta: { title: '专利无需处理' },
  },
  {
    path: '/trademark/electronic',
    name: 'trademark-electronic',
    component: Trademarkincoming,
    meta: { title: '商标电子来文' },
  },
  {
    path: '/trademark/no-action',
    name: 'trademark-no-action',
    component: PlaceholderView,
    meta: { title: '商标无需处理' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
