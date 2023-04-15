import '@/apps/shared/core/settings/main.setup'
import { createApp } from 'vue'
import PopupApp from './PopupApp.vue'
import BrowserStorage from '../shared/tools/storage'

(async function() {
  await BrowserStorage.setup()
  createApp(PopupApp).mount('#gcc-popup-content')
})()