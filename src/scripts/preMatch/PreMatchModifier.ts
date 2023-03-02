// @ts-check
import { cleanSelector } from '@/utils/StringUtils'
import $ from 'jquery'
import { domEntityType } from '../lobby/domain/domEntityType'
import { createApp } from 'vue'
import KDRComponent from '../../components/KDR.vue'
import GCCLogo from '../../components/GCCLogo.vue'
import { gcSelectors } from '../../utils/gcSelectors'
import serializer from '../lobby/serializer'
import Logger from 'js-logger'
import BrowserStorage from '../../utils/storage'
import LobbyPlayer from '../lobby/domain/LobbyPlayer'

export default class PreMatchModifier {

  challenger: any
  lobby: any

  strategiesForNewNodes: Record<domEntityType | string, (node: any) => void> = {
    PLAYER: this.reactToNewPlayer.bind(this),
    LOBBY: this.reactToLobbyCreation.bind(this),
    IGNORED: (node: any) => { },
    UNKNOWN: (node: any) => {
      Logger.warn('PreMatchModifier strategiesForNewNodes UNKNOWN domEntityType', node)
    },
  }

  strategiesForRemovedNodes: Record<domEntityType | string, (node: any) => void> = {
    PLAYER: this.reactToRemovedPlayer.bind(this),
    MY_LOBBY_CONTENT: this.reactToRemovedMyLobbyContent.bind(this),
    UNKNOWN: (node: any) => {
      // Logger.warn('PreMatchModifier strategiesForRemovedNodes UNKNOWN domEntityType', node)
    },
  }

  constructor() {
    setTimeout(() => {
      $(gcSelectors.preMatchModal.root).find(gcSelectors.preMatchModal.lobby.self).each((index, node) => {
        this.reactToLobbyCreation(node)
      })
    }, 300)

    // @ts-ignore
    $(gcSelectors.preMatchModal.root).observe(this.modify.bind(this))
  }

  modify(changes: any): void {
    if (changes && changes.length) {
      changes.map((change: any) => {
        if (change.addedNodes && change.addedNodes.length) {
          change.addedNodes.forEach((node: any) => {
            const addedNodeType: domEntityType | string = this.identifyAddedNode(node)
            const strategy = this.strategiesForNewNodes[addedNodeType]
            strategy && strategy(node)
          })
        }

        if (change.removedNodes && change.removedNodes.length) {
          change.removedNodes.forEach((node: any) => {
            const removedNodeType: domEntityType | string = this.identifyAddedNode(node)
            const strategy = this.strategiesForRemovedNodes[removedNodeType]
            strategy && strategy(node)
          })
        }
      })
    }
  }

  identifyAddedNode(node: any): domEntityType | string {
    let type: domEntityType | string = domEntityType.UNKNOWN
    const $node = $(node)
    const playersClasses = [
      gcSelectors.preMatchModal.lobby.player.self.cleanCSSSelector()
    ]
    const isPreMatchModal = $node.hasClass(gcSelectors.preMatchModal.self.cleanCSSSelector())

    if(isPreMatchModal){
      type = domEntityType.LOBBY
    } else {
      const isPlayer = playersClasses.some((selector) => $node.hasClass(selector))

      if (isPlayer) {
        type = domEntityType.PLAYER
      } else {
        type = domEntityType.IGNORED
      }
    }

    return type
  }

  identifyRemovedNode(node: any): domEntityType | string {
    const $node = $(node)
    let type: domEntityType | string

    const playersClasses = [
      gcSelectors.myLobby.player.self.cleanCSSSelector()
    ]

    const isPlayer = playersClasses.some((selector) => $node.hasClass(selector))

    if (isPlayer) {
      type = domEntityType.PLAYER
    } else {
      type = domEntityType.UNKNOWN
    }

    return type
  }

  reactToLobbyCreation(node: any) {
    this.lobby = serializer.serializePreMatchLobby(node)
    this.lobby.players?.map((player: Partial<LobbyPlayer>) => this.reactToNewPlayer(player.$el?.[0]))
    this.reactWithAutoReady()
  }

  reactToNewPlayer(node: any) {
    this.showPlayerKD(node)
  }

  reactToRemovedPlayer(node: any) {
  }

  reactToRemovedMyLobbyContent() {
  }

  showPlayerKD(playerNode: any) {
    if (BrowserStorage.settings.options?.showMyLobbyKDR) {
      const { $el: $player, kdr, id: playerId } = serializer.serializePlayer(playerNode, gcSelectors.preMatchModal.lobby.player)
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
            createApp(GCCLogo).mount(`#${gccLogoContainerId}`)
          }
        }, 200)
      }
    }
  }

}