import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './vite/plugins'
import postcsspxtoviewport from 'postcss-px-to-viewport-update'
import { pathResolve } from './src/utils/common'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, pathResolve('./env'), '')
  return {
    base: env.VITE_BASE,
    plugins: createVitePlugins(command === 'build'),
    envDir: pathResolve('./env'),
    // base: '/',
    server: {
      port: 2024,
      host: '0.0.0.0',
      proxy: {
        '/settlement': {
          target: env.VITE_APP_BASE_URL_PROXY,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/settlement/, '')
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          // 自定义输出目录结构
          entryFileNames: `js/[name].[hash].js`,
          chunkFileNames: `js/[name].[hash].js`,
          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
              return 'images/[name].[hash][extname]'
            }
            if (/\.css$/.test(name ?? '')) {
              return 'css/[name].[hash][extname]'
            }
            // 其他文件保持默认的 assets 目录
            return 'assets/[name].[hash][extname]'
          },
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        // 导入scss预编译程序
        scss: {
          // additionalData: `@use "@/assets/style/mixin.scss" as *;`
        }
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              }
            }
          },
          postcsspxtoviewport({
            unitToConvert: 'px', // 需要转换的单位，默认为"px"
            viewportWidth: 1920, // 设计稿的视口宽度
            unitPrecision: 5, // 单位转换后保留的精度
            propList: ['*'], // 能转化为vw的属性列表
            viewportUnit: 'vw', // 希望使用的视口单位
            fontViewportUnit: 'vw', // 字体使用的视口单位
            selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, // 媒体查询里的单位是否需要转换单位
            replace: true, //  是否直接更换属性值，而不添加备用属性
            exclude: [], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
            include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换
            landscape: false // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            // landscapeUnit: 'vw', // 横屏时使用的单位
            // landscapeWidth: 1440, // 横屏时使用的视口宽度
          })
        ]
      }
    }
  }
})
