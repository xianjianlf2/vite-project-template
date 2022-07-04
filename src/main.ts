import { toLine } from './utils/index'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css'
import './assets/css/index.css'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'

const app = createApp(App)

// 全局注册图标
for (let i in Icons) {
  // 注册全局组件
  app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])
}

app.use(router)
app.use(ElementPlus)
app.mount('#app')
