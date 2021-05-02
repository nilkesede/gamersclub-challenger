import { createApp } from 'vue'
import App from './popup.vue'
import store from '../../store'

createApp(App).use(store).mount('#app')
