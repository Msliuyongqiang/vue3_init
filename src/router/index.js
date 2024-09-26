import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
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
