import vue from '@vitejs/plugin-vue'

import createAutoImport from './auto-import'
import createSvgIcon from './svg-icon'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import createSetupExtend from './setup-extend'
import stylePxToVw from './stylePxToVw'
import { terser } from 'rollup-plugin-terser'

export default function createVitePlugins(isBuild = false) {
  const vitePlugins = [
    stylePxToVw(),
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    terser({
      compress: {
        drop_console: true, // 去除 console
        drop_debugger: true // 移除 debugger 语句
      }
    })
  ]
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createSetupExtend())
  vitePlugins.push(createSvgIcon(isBuild))
  return vitePlugins
}
