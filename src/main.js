import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import router from './router'
import { initIdFromUrl } from './utils/idStore'

// import './style.css'

// 入口第一时间：把 URL 上的 ?userId=xxx 固化到 localStorage
// 在 Vue app 创建之前执行，确保比任何组件的 onMounted / router.beforeEach 都早
initIdFromUrl()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, { locale: zhCn })

app.mount('#app')
