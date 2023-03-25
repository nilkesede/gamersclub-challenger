// @ts-check
import { cleanSelector } from '@/shared/StringUtils'
import $ from 'jquery'
import { domEntityType } from '../lobby/types/domEntityType'
import { createApp } from 'vue'
import KDRComponent from '@/components/KDR.vue'
import { gcSelectors } from '@/shared/gc/selectors'
import serializer from '../lobby/serializer'
import LobbyPlayer from '../lobby/types/LobbyPlayer'
import BrowserStorage from '@/shared/storage'

export default class TeamModifier {
  challenger: any
  lobby: any

  strategiesForNewNodes: Record<domEntityType | string, (node: any) => void> = {
    PLAYER: this.reactToNewPlayer.bind(this),
    LOBBY: (node: any) => { },
    IGNORED: (node: any) => { },
    UNKNOWN: (node: any) => {
      // Logger.warn('TeamModifier strategiesForNewNodes UNKNOWN domEntityType', node)
    },
  }

  strategiesForRemovedNodes: Record<domEntityType | string, (node: any) => void> = {
    PLAYER: this.reactToRemovedPlayer.bind(this),
    UNKNOWN: (node: any) => {
      // Logger.warn('TeamModifier strategiesForRemovedNodes UNKNOWN domEntityType', node)
    },
  }

  constructor() {
    // @ts-ignore
    // $(gcSelectors.teamPage.teamRoot).observe(this.modify.bind(this))
    this.reactToRender()
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
      cleanSelector(gcSelectors.teamPage.player.self)
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
    return domEntityType.UNKNOWN
  }

  reactToRender() {
    const team = serializer.serializeTeam($(gcSelectors.teamPage.teamRoot)[0])
    team.players?.map((player: Partial<LobbyPlayer>) => this.reactToNewPlayer(player.$el?.[0]))
  }

  reactToNewPlayer(node: any) {
    this.showPlayerKD(node)
  }

  reactToRemovedPlayer(node: any) {
  }

  showPlayerKD(playerNode: any) {
    const loggedUser = serializer.serializeLoggedPlayer()

    if (BrowserStorage.settings.options?.showMyLobbyKDR && BrowserStorage.settings.betaTesters?.includes(loggedUser.id?.toString() || 'invalid-id')) {
      const { $el: $player, kdr, id: playerId } = serializer.serializePlayer(playerNode, gcSelectors.teamPage.player)
      const containerName = `gcc-team-player--${playerId}`

      const $kdBooster = `<div id='${containerName}' class='${cleanSelector(gcSelectors.extension.appContainer)} padding-bottom gcc-team-player'></div>`
      $player!.append($kdBooster)
      createApp(KDRComponent, { value: kdr, playerId, toFetchData: true }).mount(`#${containerName}`)
    }
  }
}