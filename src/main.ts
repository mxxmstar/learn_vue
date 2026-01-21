import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { ArrowLeft } from '@element-plus/icons-vue';

const app = createApp(App)

app.use(ElementPlus)
app.component('ArrowLeft', ArrowLeft)
app.use(createPinia())
app.use(router)
app.mount('#app')
