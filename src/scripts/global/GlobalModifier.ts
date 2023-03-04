import $ from 'jquery'
import { gcSelectors } from '../../utils/gcSelectors'
import GCCPlayerProgress from '../../components/GCCPlayerProgress.vue'
import { createApp } from 'vue'
import BrowserStorage from '../../utils/storage'
import serializer from '../lobby/serializer'

export default class GlobalModifier {

  constructor() {
    setTimeout(this.modify.bind(this), 500)
  }

  modify() {
    this.insertPlayerProgress()
  }

  insertPlayerProgress() {
    if (BrowserStorage.settings.options?.enablePlayerProgress) {
      const $roomsContent = $(gcSelectors.globalNavBar.self)
      const containerName = `gcc-player-progress-container`
      // const $container = $('div', {
      //   id: containerName,
      //   class: [gcSelectors.extension.appContainer.cleanCSSSelector()]
      // })
      const $container = `<div id='${containerName}' class='${gcSelectors.extension.appContainer.cleanCSSSelector()}'></div>`
      const $containerInDOM = $roomsContent.find(`#${containerName}`)

      if ($containerInDOM.length === 0) {
        const { id: playerId } = serializer.serializeLoggedPlayer()
        $roomsContent.append($container)
        createApp(GCCPlayerProgress, { playerId }).mount(`#${containerName}`)
      }
    }
  }
}