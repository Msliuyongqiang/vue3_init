import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/tianjin/settleAccount/'),
  // history: createWebHashHistory('/settleAccount/'),
  routes: [
    {
      path: '/',
      redirect: '/settlement'
    },
    {
      path: '/settlement',
      name: 'settlement',
      component: () => import('@/views/settlementSystem/index.vue'),
      meta: {
        keepAlive: false
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.path === '/' && savedPosition) {
      return {
        ...savedPosition
      }
    } else {
      return { top: 0 }
    }
  }
})

export default router
