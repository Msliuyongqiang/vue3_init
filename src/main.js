import { createApp } from 'vue'
import App from './App.vue'
import store from './stores/index.js'
import router from './router'
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'
import './router/permissions.js'
import plugins from './plugins' // plugin
import '@/assets/style/global.scss'

// 分页组件
import Pagination from '@/components/Pagination/index.vue'
const app = createApp(App)

app.component('Pagination', Pagination)

app.use(store)
app.use(router)
// app.use(elementIcons)
app.use(plugins)

app.component('svg-icon', SvgIcon)
app.mount('#app')
