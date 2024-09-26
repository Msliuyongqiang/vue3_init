import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/chart'
    },
    {
      path: '/chart',
      name: 'chart',
      component: () => import('@/views/chart/index.vue')
    }
  ]
})

export default router
