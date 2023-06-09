import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupPlugin } from './plugin'

async function bootstrap(){
    const app = createApp(App)
    app.use(router)
    setupPlugin(app)
    app.mount('#app')
}

bootstrap()
