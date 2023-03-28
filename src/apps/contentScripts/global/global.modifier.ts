import $ from 'jquery'
import { gcSelectors } from '@/apps/shared/extras/gc/tools/selectors'
import GCCPlayerProgress from '@/apps/shared/components/GCCPlayerProgress.vue'
import KDR from '@/apps/shared/components/KDR.vue'
import { createApp } from 'vue'
import BrowserStorage from '@/apps/shared/tools/storage'
import serializer from '../lobby/serializer'
import { userAPI } from '@/apps/shared/extras/gc/api'
import { GCInitialPlayerStats } from '@/apps/shared/extras/gc/types/GCInitialPlayerStats'
import { GCPlayerStatsHistory } from '@/apps/shared/extras/gc/types/GCPlayerStatsHistory'
import analytics from '@/apps/shared/tools/analytics'

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
      analytics.set('gcNickname', data.playerInfo.nick)
    })

    userAPI.boxMatchesHistory(playerId).then((data) => {
      this.insertGlobalLoggedKDR(data)
    })
  }

  insertGlobalLoggedKDR(historyStats: GCPlayerStatsHistory){
    const $globalNavbar = $(gcSelectors.globalNavBar.self)
    const containerId = `gcc-global-logged-kdr-container`
    const subscriptionTopbarClass = $(gcSelectors.csgoHeader.subscriptionTopBar).length > 0 ? 'has-subscription-top-bar' : ''
    const $container = $('<div>', {
      id: containerId,
      class: `${gcSelectors.extension.appContainer.cleanCSSSelector()} ${subscriptionTopbarClass}`,
      title: 'KDR'
    })

    const $containerInDOM = $globalNavbar.find(`#${containerId}`)

    if ($containerInDOM.length === 0) {
      const { id: playerId } = this.loggedPlayer
      const kdrValue = historyStats.stat.find((stat) => stat.stat === "KDR")?.value
      $globalNavbar.append($container)
      createApp(KDR, { playerId, value: kdrValue, toFetchData: typeof kdrValue === 'undefined' }).mount(`#${containerId}`)
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