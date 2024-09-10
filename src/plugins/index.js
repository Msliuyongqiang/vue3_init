import modal from './modal'
import handleData from './handleData'

export default function installPlugins(app) {
  // 模态框对象
  app.config.globalProperties.$modal = modal
  app.config.globalProperties.$tools = handleData
}
