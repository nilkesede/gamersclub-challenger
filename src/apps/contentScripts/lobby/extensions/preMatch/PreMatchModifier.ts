// @ts-check
import $ from 'jquery'
import { createApp } from 'vue'
import KDRComponent from '@/components/KDR.vue'
import GCCLogo from '@/components/GCCLogo.vue'
import { gcSelectors } from '@/shared/extras/gc/selectors'
import serializer from '../../serializer'
import Logger from 'js-logger'
import BrowserStorage from '@/shared/tools/storage'
import LobbyPlayer from '../../types/LobbyPlayer'

export default class PreMatchModifier {
  lobby: any
  preMatchIntervalHolder: number | undefined

  constructor() {
    this.startPreMatchInterval()
  }

  startPreMatchInterval(){
    this.preMatchIntervalHolder = setInterval(this.checkPreMatch.bind(this), 300)
    Logger.debug('[PreMatchModifier] ⏲️ startPreMatchInterval', this.preMatchIntervalHolder)
  }

  checkPreMatch(){
    const $preMatchModal = $(gcSelectors.preMatchModal.root)
    Logger.debug('[PreMatchModifier] [checkPreMatch] preMatchModal length', $preMatchModal.length)

    if($preMatchModal.length){
      const $lobbies = $preMatchModal.find(gcSelectors.preMatchModal.lobby.self)
      Logger.debug('[PreMatchModifier] [checkPreMatch] lobbies length', $lobbies.length)

      if($lobbies.length){
        $lobbies.each((index, node) => {
          this.reactToLobby(node)
        })

        Logger.debug('[PreMatchModifier] ⏲️ clearInterval', this.preMatchIntervalHolder)
        clearInterval(this.preMatchIntervalHolder)
        this.preMatchIntervalHolder = undefined
      }
    }
  }

  reactToLobby(node: any) {
    const lobby = serializer.serializePreMatchLobby(node)
    Logger.debug('[PreMatchModifier] reactToLobby', lobby)
    lobby.players?.map((player: Partial<LobbyPlayer>) => this.reactToNewPlayer(player.$el?.[0]))
    this.reactWithAutoReady()
  }

  reactToNewPlayer(playerNode: any) {
    const lobbyPlayer = serializer.serializePlayer(playerNode, gcSelectors.preMatchModal.lobby.player)
    this.showPlayerKD(lobbyPlayer)
  }

  showPlayerKD(lobbyPlayer: Partial<LobbyPlayer>) {
    if (BrowserStorage.settings.options?.showMyLobbyKDR) {
      const { $el: $player, kdr, id: playerId } = lobbyPlayer
      const $kdrElement = $player!.find(gcSelectors.extension.kdr)
      const containerName = `gcc-pre-match-player--${playerId}`

      if (playerId && $kdrElement.length === 0) {
        // $player!.append('<div class="flex-break"></div>')
        const $kdBooster = `<div id='${containerName}' class='${gcSelectors.extension.appContainer.cleanCSSSelector()} padding-top gcc-pre-match-player'></div>`
        $player?.hasClass(gcSelectors.preMatchModal.lobby.player.selfFloatRight.cleanCSSSelector()) ? $player!.prepend($kdBooster) : $player!.append($kdBooster)
        createApp(KDRComponent, { value: kdr, playerId, toFetchData: typeof kdr === 'undefined' }).mount(`#${containerName}`)
      }
    }
  }

  reactWithAutoReady(){
    if(BrowserStorage.settings.options?.enableAutoReady){
      const $button = $(gcSelectors.preMatchModal.readyButton.absolute)
      Logger.debug('[PreMatchModifier] 🆚 Found Ready Button', $button.length)
      const doneClass = gcSelectors.extension.preMatchModal.readyButton.autoReadyDone.cleanCSSSelector()
      if($button?.length && !$button.prop('disabled') && !$button.hasClass(doneClass)){
        const gccLogoContainerId = 'gcc-ready-logo-container'
        const gccLogoContainer = $(`<div id='${gccLogoContainerId}' class='${gcSelectors.extension.appContainer.cleanCSSSelector()} padding-top gcc-pre-match-player'></div>`)
        setTimeout(() => {
          $button[0]?.click()
          $button.trigger('click')
          $button.addClass(doneClass)
          const $container = $(`#${gccLogoContainerId}`)
          if($container.length === 0){
            $button.append(gccLogoContainer)
            createApp(GCCLogo, { title: '✅ Auto Ready - GamersClub Challenger' }).mount(`#${gccLogoContainerId}`)
          }
        }, 200)
      }
    }
  }

}