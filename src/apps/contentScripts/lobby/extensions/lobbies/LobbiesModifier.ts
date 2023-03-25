// @ts-check
import { cleanSelector } from '@/shared/StringUtils'
import $ from 'jquery'
import { domEntityType } from '../../types/domEntityType'
import { createApp } from 'vue'
import KDRComponent from '@/components/KDR.vue'
import GCCLobbyTitle from '@/components/GCCLobbyTitle.vue'
import { gcSelectors } from '@/shared/gc/selectors'
import serializer from '../../serializer'
import lobbyFilter from '../filters/lobbyFilter'
import BrowserStorage from '@/shared/storage'
import Lobby from '../../types/Lobby'
import GCCLobbyPinner from '@/components/GCCLobbyPinner.vue'
import LobbyPlayer from '../../types/LobbyPlayer'

export default class LobbiesModifier {

  strategiesForNewNodes: Record<domEntityType, (node: any) => void> = {
    PLAYER: this.reactToNewPlayer.bind(this),
    LOBBY: this.reactToNewLobby.bind(this),
    IGNORED: (node: any) => { },
    UNKNOWN: (node: any) => {
      // Logger.warn('TeamsModifier UNKNOWN domEntityType', node)
    }
  }

  strategiesForRemovedNodes: Record<domEntityType | string, (node: any) => void> = {
    PLAYER: this.reactToRemovedPlayer.bind(this),
  }

  constructor() {
    // Initial lobbies
    $(gcSelectors.lobbies.self).each((index, element) => this.reactToNewLobby(element))

    // @ts-ignore
    $(gcSelectors.lobbies.list).observe(this.modifyAvailableTeams.bind(this))
  }

  modifyAvailableTeams(changes: any): void {
    if (changes && changes.length) {
      changes.map((change: any) => {
        if (change.addedNodes && change.addedNodes.length) {
          change.addedNodes.forEach((node: any) => {
            const addedNodeType: domEntityType = this.identifyAddedNode(node)
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

  identifyAddedNode(node: any): domEntityType {
    let type = domEntityType.UNKNOWN
    const $node = $(node)
    const ignoredSelectors = [
      cleanSelector(gcSelectors.extension.appContainer),
      cleanSelector(gcSelectors.extension.kdr),
      cleanSelector(gcSelectors.lobbies.player.avatarLink)
    ]

    const isIgnored = ignoredSelectors.some((selector) => $node.hasClass(selector))

    if (isIgnored) {
      type = domEntityType.IGNORED
    } else {
      const isLobby = $node.hasClass(cleanSelector(gcSelectors.lobbies.self)) || $node.find('.sala-card').length > 0

      if (isLobby) {
        type = domEntityType.LOBBY
      } else if ($node.hasClass(cleanSelector(gcSelectors.lobbies.player.self))) {
        type = domEntityType.PLAYER
      }
    }

    return type
  }

  identifyRemovedNode(node: any): domEntityType | string {
    const $node = $(node)
    let type: domEntityType | string

    const playersClasses = [
      cleanSelector(gcSelectors.lobbies.player.self),
    ]

    const isPlayer = playersClasses.some((selector) => $node.hasClass(selector))

    if (isPlayer) {
      type = domEntityType.PLAYER
    } else {
      type = domEntityType.IGNORED
    }

    return type
  }

  reactToRemovedPlayer(node: any) {
    const $node = $(node)
    const $lobby = $node.closest(gcSelectors.lobbies.self)

    if ($lobby && $lobby.length) {
      $lobby.removeClass(cleanSelector(gcSelectors.extension.lobbies.challenged))
    }
  }

  reactToNewLobby(node: any) {
    const serializedLobby: Partial<Lobby> = serializer.serialize(node)
    this.showKDForLobby(serializedLobby)
    // this.replaceLobbyTitle(serializedLobby)
    this.addLobbyPinner(serializedLobby)
    lobbyFilter.reactToFilter.call(lobbyFilter, node)
  }

  addLobbyPinner({ $el: $lobby }: Partial<Lobby>) {
    if (BrowserStorage.settings.options?.enableToPinLobbies) {
      const $pinner = $lobby!.find(gcSelectors.extension.lobbies.pinner.self)
      if ($pinner.length === 0) {
        const $pinnerContainer = $('<div></div>')
        createApp(GCCLobbyPinner).mount($pinnerContainer[0])
        $lobby!.find(gcSelectors.extension.lobbies.content).append($pinnerContainer)
      }
    }
  }

  reactToNewPlayer(node: any) {
    const lobbyPlayer = serializer.serializePlayer(node)
    this.showPlayerKD(lobbyPlayer)
    const $lobby = $(node).closest(gcSelectors.lobbies.self)
    lobbyFilter.reactToFilter.call(lobbyFilter, $lobby[0])
  }

  showPlayerKD(lobbyPlayer: Partial<LobbyPlayer>) {
    if (BrowserStorage.settings.options?.showLobbiesKDR) {
      const { $el: $player, kdr, id: playerId } = lobbyPlayer
      const $kdrElement = $player!.find(gcSelectors.extension.kdr)
      const containerName = `gcc-${playerId}`

      if (typeof kdr !== 'undefined') {
        if ($kdrElement.length === 0) {
          const $kdBooster = `<div id='${containerName}' class='${cleanSelector(gcSelectors.extension.appContainer)}'></div>`
          $player!.prepend($kdBooster)
          createApp(KDRComponent, { value: kdr, playerId, toFetchData: false }).mount(`#${containerName}`)
        }
      }
    }
  }

  // showPlayerMarks(lobbyPlayer: Partial<LobbyPlayer>) {
  //   const { $el: $player, id: playerId } = lobbyPlayer
  //   const $markWrapperElement = $player!.find(gcSelectors.extension.marks.wrapper)
  //   const containerName = `gcc-mark-container-${playerId}`

  //   if ($markWrapperElement.length === 0) {
  //     const $markContainer = `<div id='${containerName}' class='${cleanSelector(gcSelectors.extension.appContainer)}'></div>`
  //     $player!.append($markContainer)
  //     createApp(GCCMarkComponent, { playerId, enableAddButton: false }).mount(`#${containerName}`)
  //   }
  // }

  showKDForLobby({ players }: Partial<Lobby>): void {
    players?.map((player) => this.reactToNewPlayer(player.$el?.[0]))
  }

  replaceLobbyTitle({ $el }: Partial<Lobby>) {
    const $lobbyTittle = $el?.find(gcSelectors.lobbies.title)
    if ($lobbyTittle?.length) {
      const label = $lobbyTittle.text() || $lobbyTittle.attr('title')
      createApp(GCCLobbyTitle, { label }).mount($lobbyTittle[0])
    }
  }
}