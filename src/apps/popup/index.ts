import '../../plugins/window.setup'
import { createApp } from 'vue'
import PopupApp from './PopupApp.vue'
import store from '../../store'
import BrowserStorage from '../../utils/storage'

(async function() {
  await BrowserStorage.setup()
  createApp(PopupApp).use(store).mount('#gcc-popup-content')
})()