import { createApp } from 'vue'
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import './style.css'
import App from './App.vue'
//引入router
import router from './router'
import i18n from './locales/i18n'
import 'default-passive-events'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia).use(router).use(i18n).mount('#app')