import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { viteMockServe } from 'vite-plugin-mock'

// import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import path from 'path'
const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    viteMockServe({
      watchFiles: false,
      mockPath: './src/mock'
    }),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue', 'vue-router'],
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver()
        // 自动导入图标组件
        // IconsResolver({
        //   prefix: 'Icon'
        // })
      ],

      dts: path.resolve(pathSrc, 'auto-imports.d.ts')
    }),
    Components({
      resolvers: [
        // 自动注册图标组件
        // IconsResolver({
        //   enabledCollections: ['ep']
        // }),
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ],

      dts: path.resolve(pathSrc, 'components.d.ts')
    })
    // Icons({ scale: 1, defaultClass: 'inline-block', autoInstall: true }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8000,
    open: true,
    host: '127.0.0.1',
    proxy: {
      '^/app': {
        target: 'http://localhost:3000/api/v1/',
        changeOrigin: true,
        rewrite: (path) => path.replace('/app', '')
      },
      '^/open': {
        target: 'http://apis.juhe.cn/',
        changeOrigin: true,
        rewrite: (path) => path.replace('/open', '')
      },
      '^/ncss': {
        target: 'https://www.ncss.cn/student/jobs/jobslist/ajax/',
        changeOrigin: true,
        rewrite: (path) => path.replace('/ncss', '')
      }
    }
  }
})
