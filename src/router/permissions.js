import router from './index.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { spost, newStore } from '@/plugins/spost'
import useUserStore from '@/stores/modules/user'
NProgress.configure({ showSpinner: false })
const pathList = ['/settlement']
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  console.log('to', to)
  if (pathList.includes(to.matched[0].path)) {
    const mode = import.meta.env.MODE
    const env = import.meta.env
    console.log(env, 'envvvvvvvvvvvv')
    const envOrMode = {
      development: env.VITE_APP_BASE_URL_PROXY || '',
      test: env.VITE_APP_API_CAS_URL || '',
      production: env.VITE_APP_API_CAS_URL || ''
    }
    if (mode == 'development') {
      useUserStore().userInfo.jobNumber = 'LTHXY130'
      next()
      return
    }
    console.log('location', window.location.href)
    const url = new URL(window.location.href)
    const baseUrl = `${url.protocol}//${url.hostname}${url.port ? `:${url.port}` : ''}${url.pathname}`
    // 检查用户是否已经有有效的ticket
    const ticket = new URLSearchParams(window.location.search).get('ticket')
    if (ticket) {
      if (useUserStore().userInfo.jobNumber == '') {
        //初次登录
        try {
          const userInfo = await spost(newStore(), `/UnifyAuthority/authentication/login/cas`, {
            service: baseUrl,
            ticket: ticket
          })
          // const userInfo = {
          //   d: {
          //     code: 0,
          //     message: '操作成功',
          //     data: 'LTHXY130'
          //   }
          // }
          console.log('userInfo', userInfo)
          useUserStore().$patch((state) => {
            state.userInfo.jobNumber = userInfo.d.data
          })
          if (useUserStore().userInfo.jobNumber != '') {
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          } else {
            // window.location.href = `https://cas.newbuy.chinaunicom.cn/ESB-CAS-WEB/login?service=${baseUrl}`
            window.location.href = `${envOrMode[mode]}/ESB-CAS-WEB/login?service=${baseUrl}`
          }
        } catch (e) {
          console.log('err', e)
          ElMessage.error('获取用户信息失败')
          return
        }
      } else {
        next()
      }
    } else {
      console.log('**********,', mode, envOrMode[mode], envOrMode)
      window.location.href = `${envOrMode[mode]}/ESB-CAS-WEB/login?service=${baseUrl}`
    }
  } else if (useUserStore().userInfo.jobNumber != '') {
    NProgress.done()
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})
