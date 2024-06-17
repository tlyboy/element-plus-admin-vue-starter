import './assets/styles/main.css'
import './assets/styles/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { parseTime, resetForm } from '~/utils/ruoyi'
import plugins from './plugins'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// @ts-ignore
app.config.globalProperties.parseTime = parseTime
// @ts-ignore
app.config.globalProperties.resetForm = resetForm

app.use(plugins)

app.mount('#app')
