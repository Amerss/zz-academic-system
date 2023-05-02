import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

import App from './App.vue'
import router from './router'
import './assets/main.css'
import 'animate.css'

// element-plus 字体图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/drawer/style/css'
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/notification/style/css'

// 打印
import print from 'vue3-print-nb'

const app = createApp(App)

app.use(print)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia().use(piniaPluginPersist))
app.use(router)

app.mount('#app')
