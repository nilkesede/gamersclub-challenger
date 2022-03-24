// @ts-check
import { cleanSelector } from '@/utils/StringUtils'
import $ from 'jquery'
import { domEntityType } from '../lobby/domain/domEntityType'
import { createApp } from 'vue'
import KDRComponent from '../../components/KDR.vue'
import { gcSelectors } from '../../utils/gcSelectors'
import serializer from '../lobby/serializer'
import Logger from 'js-logger'
import BrowserStorage from '../../utils/storage'

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


    // @ts-ignore
    $(gcSelectors.matchModal.root).observe(this.modify.bind(this))
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
    const ignoredSelectors = [
      cleanSelector(gcSelectors.extension.appContainer),
      cleanSelector(gcSelectors.extension.kdr),
    ]
    const playersClasses = [
      gcSelectors.matchModal.player.self.cleanCSSSelector()
    ]

    const isIgnored = ignoredSelectors.some((selector) => $node.hasClass(selector))

    if (isIgnored) {
      type = domEntityType.IGNORED
    } else {
      const isPlayer = playersClasses.some((selector) => $node.hasClass(selector))

      if (isPlayer) {
        type = domEntityType.PLAYER
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
    //this.lobby = serializer.serializeMyLobby(node)
    //this.lobby.players?.map((player: Partial<LobbyPlayer>) => this.reactToNewPlayer(player.$el?.[0]))
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
      const { $el: $player, kdr, id: playerId } = serializer.serializePlayer(playerNode, gcSelectors.matchModal.player)
      const $kdrElement = $player!.find(gcSelectors.extension.kdr)
      const containerName = `gcc-match-player--${playerId}`

      if (typeof kdr !== 'undefined' && $kdrElement.length === 0) {
        const $kdBooster = `<div id='${containerName}' class='${gcSelectors.extension.appContainer.cleanCSSSelector()} padding-top gcc-my-lobby-player'></div>`
        $player!.append($kdBooster)
        createApp(KDRComponent, { value: kdr, playerId }).mount(`#${containerName}`)
      }
    }
  }

}