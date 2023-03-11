import $ from 'jquery'
import { gcSelectors } from '../../utils/gcSelectors'
import GCCPlayerProgress from '../../components/GCCPlayerProgress.vue'
import KDR from '../../components/KDR.vue'
import { createApp } from 'vue'
import BrowserStorage from '../../utils/storage'
import serializer from '../lobby/serializer'
import { userAPI } from '@/utils/gcAPI'
import { GCInitialPlayerStats } from '../lobby/domain/GCInitialPlayerStats'
import { GCPlayerStatsHistory } from '../lobby/domain/GCPlayerStatsHistory'

export default class GlobalModifier {
  loggedPlayer

  constructor() {
    setTimeout(this.modify.bind(this), 500)
    this.loggedPlayer = serializer.serializeLoggedPlayer()
  }

  modify() {
    const { id: playerId } = this.loggedPlayer
    userAPI.boxInitialMatches(playerId).then((data) => {
      this.insertPlayerProgress(data)
    })

    userAPI.boxMatchesHistory(playerId).then((data) => {
      this.insertGlobalLoggedKDR(data)
    })
  }

  insertGlobalLoggedKDR(historyStats: GCPlayerStatsHistory){
    const $globalNavbar = $(gcSelectors.globalNavBar.self)
    const containerName = `gcc-global-logged-kdr-container`
    const $container = `<div id='${containerName}' class='${gcSelectors.extension.appContainer.cleanCSSSelector()}'></div>`
    const $containerInDOM = $globalNavbar.find(`#${containerName}`)

    if ($containerInDOM.length === 0) {
      const { id: playerId } = this.loggedPlayer
      const kdrValue = historyStats.stat.find((stat) => stat.stat === "KDR")?.value
      $globalNavbar.append($container)
      createApp(KDR, { playerId, value: kdrValue, toFetchData: typeof kdrValue === 'undefined' }).mount(`#${containerName}`)
    }
  }

  insertPlayerProgress(initialStats: GCInitialPlayerStats) {
    if (BrowserStorage.settings.options?.enablePlayerProgress) {

      const $globalNavbar = $(gcSelectors.globalNavBar.self)
      const containerName = `gcc-player-progress-container`
      const $container = `<div id='${containerName}' class='${gcSelectors.extension.appContainer.cleanCSSSelector()}'></div>`
      const $containerInDOM = $globalNavbar.find(`#${containerName}`)

      if ($containerInDOM.length === 0) {
        const { id: playerId } = this.loggedPlayer
        $globalNavbar.append($container)
        createApp(GCCPlayerProgress, { playerId, initialStats }).mount(`#${containerName}`)
      }
    }
  }
}