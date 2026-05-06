import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

const app = createApp(App)

app.use(router)
app.use(i18n)

// Wait for router to be ready before mounting to avoid UI flicker
router.isReady().then(() => {
  app.mount('#app')
})
