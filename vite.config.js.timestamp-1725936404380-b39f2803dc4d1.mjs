// vite.config.js
import { fileURLToPath, URL } from 'node:url'
import {
  defineConfig,
  loadEnv
} from 'file:///C:/Code/Conpany-Code/jiesuan/settle_account/node_modules/vite/dist/node/index.js'

// vite/plugins/index.js
import vue from 'file:///C:/Code/Conpany-Code/jiesuan/settle_account/node_modules/@vitejs/plugin-vue/dist/index.mjs'

// vite/plugins/auto-import.js
import autoImport from 'file:///C:/Code/Conpany-Code/jiesuan/settle_account/node_modules/unplugin-auto-import/dist/vite.js'
function createAutoImport() {
  return autoImport({
    imports: ['vue', 'vue-router', 'pinia'],
    dts: false,
    eslintrc: {
      enabled: true,
      // Default `false`
      filepath: './.eslintrc-auto-import.json',
      // Default `./.eslintrc-auto-import.json`
      globalsPropValue: true
      // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    }
  })
}

// vite/plugins/svg-icon.js
import { createSvgIconsPlugin } from 'file:///C:/Code/Conpany-Code/jiesuan/settle_account/node_modules/vite-plugin-svg-icons/dist/index.mjs'
import path from 'path'
function createSvgIcon(isBuild) {
  const a = createSvgIconsPlugin({
    // eslint-disable-next-line no-undef
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: isBuild
  })
  return a
}

// vite/plugins/index.js
import AutoImport from 'file:///C:/Code/Conpany-Code/jiesuan/settle_account/node_modules/unplugin-auto-import/dist/vite.js'
import Components from 'file:///C:/Code/Conpany-Code/jiesuan/settle_account/node_modules/unplugin-vue-components/dist/vite.js'
import { ElementPlusResolver } from 'file:///C:/Code/Conpany-Code/jiesuan/settle_account/node_modules/unplugin-vue-components/dist/resolvers.js'

// vite/plugins/setup-extend.js
import setupExtend from 'file:///C:/Code/Conpany-Code/jiesuan/settle_account/node_modules/unplugin-vue-setup-extend-plus/dist/vite.js'
function createSetupExtend() {
  return setupExtend({})
}

// vite/plugins/stylePxToVw.js
var defaultsProp = {
  unitToConvert: 'px',
  viewportWidth: 1920,
  unitPrecision: 5,
  viewportUnit: 'vw',
  fontViewportUnit: 'vw',
  minPixelValue: 1
}
function toFixed(number, precision) {
  var multiplier = Math.pow(10, precision + 1),
    wholeNumber = Math.floor(number * multiplier)
  return (Math.round(wholeNumber / 10) * 10) / multiplier
}
function createPxReplace(viewportSize, minPixelValue, unitPrecision, viewportUnit) {
  return function ($0, $1) {
    if (!$1) return
    var pixels = parseFloat($1)
    if (pixels <= minPixelValue) return
    return toFixed((pixels / viewportSize) * 100, unitPrecision) + viewportUnit
  }
}
var templateReg = /<template>([\s\S]+)<\/template>/gi
var pxGlobalReg = /(\d+)px/gi
var pluginGenerator = (customOptions = defaultsProp) => {
  return {
    // 插件名称
    name: 'postcss-px-to-viewport-update',
    // transform 钩子
    async transform(code, id) {
      let _source = ''
      if (/.vue$/.test(id)) {
        let _source2 = ''
        if (templateReg.test(code)) {
          _source2 = code.match(templateReg)[0]
        }
        if (pxGlobalReg.test(_source2)) {
          let $_source = _source2.replace(
            pxGlobalReg,
            createPxReplace(
              customOptions.viewportWidth,
              customOptions.minPixelValue,
              customOptions.unitPrecision,
              customOptions.viewportUnit
            )
          )
          code = code.replace(_source2, $_source)
        }
      }
      return { code }
    }
  }
}
var stylePxToVw_default = pluginGenerator

// vite/plugins/index.js
import { terser } from 'file:///C:/Code/Conpany-Code/jiesuan/settle_account/node_modules/rollup-plugin-terser/rollup-plugin-terser.mjs'
function createVitePlugins(isBuild = false) {
  const vitePlugins = [
    stylePxToVw_default(),
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    terser({
      compress: {
        drop_console: true,
        // 去除 console
        drop_debugger: true
        // 移除 debugger 语句
      }
    })
  ]
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createSetupExtend())
  vitePlugins.push(createSvgIcon(isBuild))
  return vitePlugins
}

// vite.config.js
import postcsspxtoviewport from 'file:///C:/Code/Conpany-Code/jiesuan/settle_account/node_modules/postcss-px-to-viewport-update/index.js'

// src/utils/common.js
import path2 from 'path'
var pathResolve = (dir) => {
  return path2.resolve(process.cwd(), '.', dir)
}

// vite.config.js
var __vite_injected_original_import_meta_url =
  'file:///C:/Code/Conpany-Code/jiesuan/settle_account/vite.config.js'
var vite_config_default = defineConfig(({ command, mode }) => {
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
          rewrite: (path3) => path3.replace(/^\/settlement/, '')
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
        '@': fileURLToPath(new URL('./src', __vite_injected_original_import_meta_url))
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
            unitToConvert: 'px',
            // 需要转换的单位，默认为"px"
            viewportWidth: 1920,
            // 设计稿的视口宽度
            unitPrecision: 5,
            // 单位转换后保留的精度
            propList: ['*'],
            // 能转化为vw的属性列表
            viewportUnit: 'vw',
            // 希望使用的视口单位
            fontViewportUnit: 'vw',
            // 字体使用的视口单位
            selectorBlackList: [],
            // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1,
            // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false,
            // 媒体查询里的单位是否需要转换单位
            replace: true,
            //  是否直接更换属性值，而不添加备用属性
            exclude: [],
            // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
            include: void 0,
            // 如果设置了include，那将只有匹配到的文件才会被转换
            landscape: false
            // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            // landscapeUnit: 'vw', // 横屏时使用的单位
            // landscapeWidth: 1440, // 横屏时使用的视口宽度
          })
        ]
      }
    }
  }
})
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAidml0ZS9wbHVnaW5zL2luZGV4LmpzIiwgInZpdGUvcGx1Z2lucy9hdXRvLWltcG9ydC5qcyIsICJ2aXRlL3BsdWdpbnMvc3ZnLWljb24uanMiLCAidml0ZS9wbHVnaW5zL3NldHVwLWV4dGVuZC5qcyIsICJ2aXRlL3BsdWdpbnMvc3R5bGVQeFRvVncuanMiLCAic3JjL3V0aWxzL2NvbW1vbi5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXENvZGVcXFxcQ29ucGFueS1Db2RlXFxcXGppZXN1YW5cXFxcc2V0dGxlX2FjY291bnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXENvZGVcXFxcQ29ucGFueS1Db2RlXFxcXGppZXN1YW5cXFxcc2V0dGxlX2FjY291bnRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L0NvZGUvQ29ucGFueS1Db2RlL2ppZXN1YW4vc2V0dGxlX2FjY291bnQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCBjcmVhdGVWaXRlUGx1Z2lucyBmcm9tICcuL3ZpdGUvcGx1Z2lucydcbmltcG9ydCBwb3N0Y3NzcHh0b3ZpZXdwb3J0IGZyb20gJ3Bvc3Rjc3MtcHgtdG8tdmlld3BvcnQtdXBkYXRlJ1xuaW1wb3J0IHsgcGF0aFJlc29sdmUgfSBmcm9tICcuL3NyYy91dGlscy9jb21tb24nXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH0pID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwYXRoUmVzb2x2ZSgnLi9lbnYnKSwgJycpXG4gIHJldHVybiB7XG4gICAgYmFzZTogZW52LlZJVEVfQkFTRSxcbiAgICBwbHVnaW5zOiBjcmVhdGVWaXRlUGx1Z2lucyhjb21tYW5kID09PSAnYnVpbGQnKSxcbiAgICBlbnZEaXI6IHBhdGhSZXNvbHZlKCcuL2VudicpLFxuICAgIC8vIGJhc2U6ICcvJyxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHBvcnQ6IDIwMjQsXG4gICAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgICBwcm94eToge1xuICAgICAgICAnL3NldHRsZW1lbnQnOiB7XG4gICAgICAgICAgdGFyZ2V0OiBlbnYuVklURV9BUFBfQkFTRV9VUkxfUFJPWFksXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9zZXR0bGVtZW50LywgJycpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIC8vIFx1ODFFQVx1NUI5QVx1NEU0OVx1OEY5M1x1NTFGQVx1NzZFRVx1NUY1NVx1N0VEM1x1Njc4NFxuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiBganMvW25hbWVdLltoYXNoXS5qc2AsXG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6IGBqcy9bbmFtZV0uW2hhc2hdLmpzYCxcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogKHsgbmFtZSB9KSA9PiB7XG4gICAgICAgICAgICBpZiAoL1xcLihnaWZ8anBlP2d8cG5nfHN2ZykkLy50ZXN0KG5hbWUgPz8gJycpKSB7XG4gICAgICAgICAgICAgIHJldHVybiAnaW1hZ2VzL1tuYW1lXS5baGFzaF1bZXh0bmFtZV0nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoL1xcLmNzcyQvLnRlc3QobmFtZSA/PyAnJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdjc3MvW25hbWVdLltoYXNoXVtleHRuYW1lXSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFx1NTE3Nlx1NEVENlx1NjU4N1x1NEVGNlx1NEZERFx1NjMwMVx1OUVEOFx1OEJBNFx1NzY4NCBhc3NldHMgXHU3NkVFXHU1RjU1XG4gICAgICAgICAgICByZXR1cm4gJ2Fzc2V0cy9bbmFtZV0uW2hhc2hdW2V4dG5hbWVdJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XG4gICAgICAgICAgICAgIHJldHVybiAndmVuZG9yJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICAgIH1cbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICAvLyBcdTVCRkNcdTUxNjVzY3NzXHU5ODg0XHU3RjE2XHU4QkQxXHU3QTBCXHU1RThGXG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEB1c2UgXCJAL2Fzc2V0cy9zdHlsZS9taXhpbi5zY3NzXCIgYXMgKjtgXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwb3N0Y3NzOiB7XG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwb3N0Y3NzUGx1Z2luOiAnaW50ZXJuYWw6Y2hhcnNldC1yZW1vdmFsJyxcbiAgICAgICAgICAgIEF0UnVsZToge1xuICAgICAgICAgICAgICBjaGFyc2V0OiAoYXRSdWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGF0UnVsZS5uYW1lID09PSAnY2hhcnNldCcpIHtcbiAgICAgICAgICAgICAgICAgIGF0UnVsZS5yZW1vdmUoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9zdGNzc3B4dG92aWV3cG9ydCh7XG4gICAgICAgICAgICB1bml0VG9Db252ZXJ0OiAncHgnLCAvLyBcdTk3MDBcdTg5ODFcdThGNkNcdTYzNjJcdTc2ODRcdTUzNTVcdTRGNERcdUZGMENcdTlFRDhcdThCQTRcdTRFM0FcInB4XCJcbiAgICAgICAgICAgIHZpZXdwb3J0V2lkdGg6IDE5MjAsIC8vIFx1OEJCRVx1OEJBMVx1N0EzRlx1NzY4NFx1ODlDNlx1NTNFM1x1NUJCRFx1NUVBNlxuICAgICAgICAgICAgdW5pdFByZWNpc2lvbjogNSwgLy8gXHU1MzU1XHU0RjREXHU4RjZDXHU2MzYyXHU1NDBFXHU0RkREXHU3NTU5XHU3Njg0XHU3Q0JFXHU1RUE2XG4gICAgICAgICAgICBwcm9wTGlzdDogWycqJ10sIC8vIFx1ODBGRFx1OEY2Q1x1NTMxNlx1NEUzQXZ3XHU3Njg0XHU1QzVFXHU2MDI3XHU1MjE3XHU4ODY4XG4gICAgICAgICAgICB2aWV3cG9ydFVuaXQ6ICd2dycsIC8vIFx1NUUwQ1x1NjcxQlx1NEY3Rlx1NzUyOFx1NzY4NFx1ODlDNlx1NTNFM1x1NTM1NVx1NEY0RFxuICAgICAgICAgICAgZm9udFZpZXdwb3J0VW5pdDogJ3Z3JywgLy8gXHU1QjU3XHU0RjUzXHU0RjdGXHU3NTI4XHU3Njg0XHU4OUM2XHU1M0UzXHU1MzU1XHU0RjREXG4gICAgICAgICAgICBzZWxlY3RvckJsYWNrTGlzdDogW10sIC8vIFx1OTcwMFx1ODk4MVx1NUZGRFx1NzU2NVx1NzY4NENTU1x1OTAwOVx1NjJFOVx1NTY2OFx1RkYwQ1x1NEUwRFx1NEYxQVx1OEY2Q1x1NEUzQVx1ODlDNlx1NTNFM1x1NTM1NVx1NEY0RFx1RkYwQ1x1NEY3Rlx1NzUyOFx1NTM5Rlx1NjcwOVx1NzY4NHB4XHU3QjQ5XHU1MzU1XHU0RjREXHUzMDAyXG4gICAgICAgICAgICBtaW5QaXhlbFZhbHVlOiAxLCAvLyBcdThCQkVcdTdGNkVcdTY3MDBcdTVDMEZcdTc2ODRcdThGNkNcdTYzNjJcdTY1NzBcdTUwM0NcdUZGMENcdTU5ODJcdTY3OUNcdTRFM0ExXHU3Njg0XHU4QkREXHVGRjBDXHU1M0VBXHU2NzA5XHU1OTI3XHU0RThFMVx1NzY4NFx1NTAzQ1x1NEYxQVx1ODhBQlx1OEY2Q1x1NjM2MlxuICAgICAgICAgICAgbWVkaWFRdWVyeTogZmFsc2UsIC8vIFx1NUE5Mlx1NEY1M1x1NjdFNVx1OEJFMlx1OTFDQ1x1NzY4NFx1NTM1NVx1NEY0RFx1NjYyRlx1NTQyNlx1OTcwMFx1ODk4MVx1OEY2Q1x1NjM2Mlx1NTM1NVx1NEY0RFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSwgLy8gIFx1NjYyRlx1NTQyNlx1NzZGNFx1NjNBNVx1NjZGNFx1NjM2Mlx1NUM1RVx1NjAyN1x1NTAzQ1x1RkYwQ1x1ODAwQ1x1NEUwRFx1NkRGQlx1NTJBMFx1NTkwN1x1NzUyOFx1NUM1RVx1NjAyN1xuICAgICAgICAgICAgZXhjbHVkZTogW10sIC8vIFx1NUZGRFx1NzU2NVx1NjdEMFx1NEU5Qlx1NjU4N1x1NEVGNlx1NTkzOVx1NEUwQlx1NzY4NFx1NjU4N1x1NEVGNlx1NjIxNlx1NzI3OVx1NUI5QVx1NjU4N1x1NEVGNlx1RkYwQ1x1NEY4Qlx1NTk4MiAnbm9kZV9tb2R1bGVzJyBcdTRFMEJcdTc2ODRcdTY1ODdcdTRFRjZcbiAgICAgICAgICAgIGluY2x1ZGU6IHVuZGVmaW5lZCwgLy8gXHU1OTgyXHU2NzlDXHU4QkJFXHU3RjZFXHU0RTg2aW5jbHVkZVx1RkYwQ1x1OTBBM1x1NUMwNlx1NTNFQVx1NjcwOVx1NTMzOVx1OTE0RFx1NTIzMFx1NzY4NFx1NjU4N1x1NEVGNlx1NjI0RFx1NEYxQVx1ODhBQlx1OEY2Q1x1NjM2MlxuICAgICAgICAgICAgbGFuZHNjYXBlOiBmYWxzZSAvLyBcdTY2MkZcdTU0MjZcdTZERkJcdTUyQTBcdTY4MzlcdTYzNkUgbGFuZHNjYXBlV2lkdGggXHU3NTFGXHU2MjEwXHU3Njg0XHU1QTkyXHU0RjUzXHU2N0U1XHU4QkUyXHU2NzYxXHU0RUY2IEBtZWRpYSAob3JpZW50YXRpb246IGxhbmRzY2FwZSlcbiAgICAgICAgICAgIC8vIGxhbmRzY2FwZVVuaXQ6ICd2dycsIC8vIFx1NkEyQVx1NUM0Rlx1NjVGNlx1NEY3Rlx1NzUyOFx1NzY4NFx1NTM1NVx1NEY0RFxuICAgICAgICAgICAgLy8gbGFuZHNjYXBlV2lkdGg6IDE0NDAsIC8vIFx1NkEyQVx1NUM0Rlx1NjVGNlx1NEY3Rlx1NzUyOFx1NzY4NFx1ODlDNlx1NTNFM1x1NUJCRFx1NUVBNlxuICAgICAgICAgIH0pXG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXENvZGVcXFxcQ29ucGFueS1Db2RlXFxcXGppZXN1YW5cXFxcc2V0dGxlX2FjY291bnRcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxDb2RlXFxcXENvbnBhbnktQ29kZVxcXFxqaWVzdWFuXFxcXHNldHRsZV9hY2NvdW50XFxcXHZpdGVcXFxccGx1Z2luc1xcXFxpbmRleC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovQ29kZS9Db25wYW55LUNvZGUvamllc3Vhbi9zZXR0bGVfYWNjb3VudC92aXRlL3BsdWdpbnMvaW5kZXguanNcIjtpbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcblxuaW1wb3J0IGNyZWF0ZUF1dG9JbXBvcnQgZnJvbSAnLi9hdXRvLWltcG9ydCdcbmltcG9ydCBjcmVhdGVTdmdJY29uIGZyb20gJy4vc3ZnLWljb24nXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXG5pbXBvcnQgY3JlYXRlU2V0dXBFeHRlbmQgZnJvbSAnLi9zZXR1cC1leHRlbmQnXG5pbXBvcnQgc3R5bGVQeFRvVncgZnJvbSAnLi9zdHlsZVB4VG9WdydcbmltcG9ydCB7IHRlcnNlciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdGVyc2VyJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVWaXRlUGx1Z2lucyhpc0J1aWxkID0gZmFsc2UpIHtcbiAgY29uc3Qgdml0ZVBsdWdpbnMgPSBbXG4gICAgc3R5bGVQeFRvVncoKSxcbiAgICB2dWUoKSxcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV1cbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV1cbiAgICB9KSxcbiAgICB0ZXJzZXIoe1xuICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLCAvLyBcdTUzQkJcdTk2NjQgY29uc29sZVxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlIC8vIFx1NzlGQlx1OTY2NCBkZWJ1Z2dlciBcdThCRURcdTUzRTVcbiAgICAgIH1cbiAgICB9KVxuICBdXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlQXV0b0ltcG9ydCgpKVxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZVNldHVwRXh0ZW5kKCkpXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlU3ZnSWNvbihpc0J1aWxkKSlcbiAgcmV0dXJuIHZpdGVQbHVnaW5zXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXENvZGVcXFxcQ29ucGFueS1Db2RlXFxcXGppZXN1YW5cXFxcc2V0dGxlX2FjY291bnRcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxDb2RlXFxcXENvbnBhbnktQ29kZVxcXFxqaWVzdWFuXFxcXHNldHRsZV9hY2NvdW50XFxcXHZpdGVcXFxccGx1Z2luc1xcXFxhdXRvLWltcG9ydC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovQ29kZS9Db25wYW55LUNvZGUvamllc3Vhbi9zZXR0bGVfYWNjb3VudC92aXRlL3BsdWdpbnMvYXV0by1pbXBvcnQuanNcIjtpbXBvcnQgYXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVBdXRvSW1wb3J0KCkge1xuICByZXR1cm4gYXV0b0ltcG9ydCh7XG4gICAgaW1wb3J0czogWyd2dWUnLCAndnVlLXJvdXRlcicsICdwaW5pYSddLFxuICAgIGR0czogZmFsc2UsXG4gICAgZXNsaW50cmM6IHtcbiAgICAgIGVuYWJsZWQ6IHRydWUsIC8vIERlZmF1bHQgYGZhbHNlYFxuICAgICAgZmlsZXBhdGg6ICcuLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uJywgLy8gRGVmYXVsdCBgLi8uZXNsaW50cmMtYXV0by1pbXBvcnQuanNvbmBcbiAgICAgIGdsb2JhbHNQcm9wVmFsdWU6IHRydWUgLy8gRGVmYXVsdCBgdHJ1ZWAsICh0cnVlIHwgZmFsc2UgfCAncmVhZG9ubHknIHwgJ3JlYWRhYmxlJyB8ICd3cml0YWJsZScgfCAnd3JpdGVhYmxlJylcbiAgICB9XG4gIH0pXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXENvZGVcXFxcQ29ucGFueS1Db2RlXFxcXGppZXN1YW5cXFxcc2V0dGxlX2FjY291bnRcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxDb2RlXFxcXENvbnBhbnktQ29kZVxcXFxqaWVzdWFuXFxcXHNldHRsZV9hY2NvdW50XFxcXHZpdGVcXFxccGx1Z2luc1xcXFxzdmctaWNvbi5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovQ29kZS9Db25wYW55LUNvZGUvamllc3Vhbi9zZXR0bGVfYWNjb3VudC92aXRlL3BsdWdpbnMvc3ZnLWljb24uanNcIjtpbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVN2Z0ljb24oaXNCdWlsZCkge1xyXG4gIGNvbnN0IGEgPSBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcclxuICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zL3N2ZycpXSxcclxuICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxyXG4gICAgc3Znb09wdGlvbnM6IGlzQnVpbGRcclxuICB9KVxyXG4gIHJldHVybiBhXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxDb2RlXFxcXENvbnBhbnktQ29kZVxcXFxqaWVzdWFuXFxcXHNldHRsZV9hY2NvdW50XFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcQ29kZVxcXFxDb25wYW55LUNvZGVcXFxcamllc3VhblxcXFxzZXR0bGVfYWNjb3VudFxcXFx2aXRlXFxcXHBsdWdpbnNcXFxcc2V0dXAtZXh0ZW5kLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Db2RlL0NvbnBhbnktQ29kZS9qaWVzdWFuL3NldHRsZV9hY2NvdW50L3ZpdGUvcGx1Z2lucy9zZXR1cC1leHRlbmQuanNcIjtpbXBvcnQgc2V0dXBFeHRlbmQgZnJvbSAndW5wbHVnaW4tdnVlLXNldHVwLWV4dGVuZC1wbHVzL3ZpdGUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVNldHVwRXh0ZW5kKCkge1xuICByZXR1cm4gc2V0dXBFeHRlbmQoe30pXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXENvZGVcXFxcQ29ucGFueS1Db2RlXFxcXGppZXN1YW5cXFxcc2V0dGxlX2FjY291bnRcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxDb2RlXFxcXENvbnBhbnktQ29kZVxcXFxqaWVzdWFuXFxcXHNldHRsZV9hY2NvdW50XFxcXHZpdGVcXFxccGx1Z2luc1xcXFxzdHlsZVB4VG9Wdy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovQ29kZS9Db25wYW55LUNvZGUvamllc3Vhbi9zZXR0bGVfYWNjb3VudC92aXRlL3BsdWdpbnMvc3R5bGVQeFRvVncuanNcIjsvLyBcdTlFRDhcdThCQTRcdTUzQzJcdTY1NzBcbmxldCBkZWZhdWx0c1Byb3AgPSB7XG4gIHVuaXRUb0NvbnZlcnQ6ICdweCcsXG4gIHZpZXdwb3J0V2lkdGg6IDE5MjAsXG4gIHVuaXRQcmVjaXNpb246IDUsXG4gIHZpZXdwb3J0VW5pdDogJ3Z3JyxcbiAgZm9udFZpZXdwb3J0VW5pdDogJ3Z3JyxcbiAgbWluUGl4ZWxWYWx1ZTogMVxufVxuZnVuY3Rpb24gdG9GaXhlZChudW1iZXIsIHByZWNpc2lvbikge1xuICB2YXIgbXVsdGlwbGllciA9IE1hdGgucG93KDEwLCBwcmVjaXNpb24gKyAxKSxcbiAgICB3aG9sZU51bWJlciA9IE1hdGguZmxvb3IobnVtYmVyICogbXVsdGlwbGllcilcbiAgcmV0dXJuIChNYXRoLnJvdW5kKHdob2xlTnVtYmVyIC8gMTApICogMTApIC8gbXVsdGlwbGllclxufVxuXG5mdW5jdGlvbiBjcmVhdGVQeFJlcGxhY2Uodmlld3BvcnRTaXplLCBtaW5QaXhlbFZhbHVlLCB1bml0UHJlY2lzaW9uLCB2aWV3cG9ydFVuaXQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkMCwgJDEpIHtcbiAgICBpZiAoISQxKSByZXR1cm5cbiAgICB2YXIgcGl4ZWxzID0gcGFyc2VGbG9hdCgkMSlcbiAgICBpZiAocGl4ZWxzIDw9IG1pblBpeGVsVmFsdWUpIHJldHVyblxuICAgIHJldHVybiB0b0ZpeGVkKChwaXhlbHMgLyB2aWV3cG9ydFNpemUpICogMTAwLCB1bml0UHJlY2lzaW9uKSArIHZpZXdwb3J0VW5pdFxuICB9XG59XG5jb25zdCB0ZW1wbGF0ZVJlZyA9IC88dGVtcGxhdGU+KFtcXHNcXFNdKyk8XFwvdGVtcGxhdGU+L2dpXG5jb25zdCBweEdsb2JhbFJlZyA9IC8oXFxkKylweC9naVxuXG4vLyBcdTc1MUZcdTYyMTBcdTYzRDJcdTRFRjZcdTc2ODRcdTVERTVcdTUzODJcdTY1QjlcdTZDRDVcbmNvbnN0IHBsdWdpbkdlbmVyYXRvciA9IChjdXN0b21PcHRpb25zID0gZGVmYXVsdHNQcm9wKSA9PiB7XG4gIC8vIFx1OEZENFx1NTZERVx1NjNEMlx1NEVGNlxuICByZXR1cm4ge1xuICAgIC8vIFx1NjNEMlx1NEVGNlx1NTQwRFx1NzlGMFxuICAgIG5hbWU6ICdwb3N0Y3NzLXB4LXRvLXZpZXdwb3J0LXVwZGF0ZScsXG4gICAgLy8gdHJhbnNmb3JtIFx1OTRBOVx1NUI1MFxuICAgIGFzeW5jIHRyYW5zZm9ybShjb2RlLCBpZCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBsZXQgX3NvdXJjZSA9ICcnXG4gICAgICBpZiAoLy52dWUkLy50ZXN0KGlkKSkge1xuICAgICAgICBsZXQgX3NvdXJjZSA9ICcnXG4gICAgICAgIGlmICh0ZW1wbGF0ZVJlZy50ZXN0KGNvZGUpKSB7XG4gICAgICAgICAgX3NvdXJjZSA9IGNvZGUubWF0Y2godGVtcGxhdGVSZWcpWzBdXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHB4R2xvYmFsUmVnLnRlc3QoX3NvdXJjZSkpIHtcbiAgICAgICAgICBsZXQgJF9zb3VyY2UgPSBfc291cmNlLnJlcGxhY2UoXG4gICAgICAgICAgICBweEdsb2JhbFJlZyxcbiAgICAgICAgICAgIGNyZWF0ZVB4UmVwbGFjZShcbiAgICAgICAgICAgICAgY3VzdG9tT3B0aW9ucy52aWV3cG9ydFdpZHRoLFxuICAgICAgICAgICAgICBjdXN0b21PcHRpb25zLm1pblBpeGVsVmFsdWUsXG4gICAgICAgICAgICAgIGN1c3RvbU9wdGlvbnMudW5pdFByZWNpc2lvbixcbiAgICAgICAgICAgICAgY3VzdG9tT3B0aW9ucy52aWV3cG9ydFVuaXRcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG5cbiAgICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKF9zb3VyY2UsICRfc291cmNlKVxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNvZGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4geyBjb2RlIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGx1Z2luR2VuZXJhdG9yXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXENvZGVcXFxcQ29ucGFueS1Db2RlXFxcXGppZXN1YW5cXFxcc2V0dGxlX2FjY291bnRcXFxcc3JjXFxcXHV0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxDb2RlXFxcXENvbnBhbnktQ29kZVxcXFxqaWVzdWFuXFxcXHNldHRsZV9hY2NvdW50XFxcXHNyY1xcXFx1dGlsc1xcXFxjb21tb24uanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L0NvZGUvQ29ucGFueS1Db2RlL2ppZXN1YW4vc2V0dGxlX2FjY291bnQvc3JjL3V0aWxzL2NvbW1vbi5qc1wiO2ltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcblxyXG5jb25zdCBwYXRoUmVzb2x2ZSA9IChkaXIpID0+IHtcclxuICByZXR1cm4gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICcuJywgZGlyKVxyXG59XHJcbi8vXHU4M0I3XHU1M0Q2XHU1N0ZBXHU4REVGXHU1Rjg0XHJcbmNvbnN0IGdldEJhc2VVcmwgPSAodHlwZSkgPT4ge1xyXG4gIGNvbnN0IGVudiA9IGltcG9ydC5tZXRhLmVudlxyXG4gIGxldCBiYXNlVVJMXHJcbiAgY29uc3QgaXNEZXYgPSBlbnYuTU9ERSA9PT0gJ2RldmVsb3BtZW50JyAmJiBlbnYuVklURV9QVUJMSUNfVVNFX1BST1hZID09PSAnMSdcclxuICBpZiAodHlwZSA9PSAxKSB7XHJcbiAgICBiYXNlVVJMID0gaXNEZXYgPyBlbnYuVklURV9BUFBfQVBJX0Rldl9VUkwgOiBlbnYuVklURV9BUFBfQVBJX0JBU0VfVVJMXHJcbiAgfVxyXG4gIHJldHVybiBiYXNlVVJMXHJcbn1cclxuXHJcbmV4cG9ydCB7IHBhdGhSZXNvbHZlLCBnZXRCYXNlVXJsIH1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2VCxTQUFTLGVBQWUsV0FBVztBQUVoVyxTQUFTLGNBQWMsZUFBZTs7O0FDRnNULE9BQU8sU0FBUzs7O0FDQUosT0FBTyxnQkFBZ0I7QUFF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
