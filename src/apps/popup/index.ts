import '../../plugins/window.setup'
import { createApp } from 'vue'
import PopupApp from './PopupApp.vue'
import BrowserStorage from '../../utils/storage'

(async function() {
  await BrowserStorage.setup()
  createApp(PopupApp).mount('#gcc-popup-content')
})()