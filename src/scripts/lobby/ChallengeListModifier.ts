  // @ts-check
import { cleanSelector } from '@/utils/StringUtils'
import $ from 'jquery'
import { domEntityType } from './domain/domEntityType'
import { createApp } from 'vue'
import KDRComponent from '../../components/KDR.vue'
import { gcSelectors } from '../../utils/gcSelectors'
import serializer from './serializer'
import lobbyFilter from './lobbyFilter'
import Logger from 'js-logger'
import BrowserStorage from '../../utils/storage'

export default class ChallengeListModifier {

  strategiesForNewNodes: Record<domEntityType | string, (node: any) => void > = {
    LOBBY: this.reactToNewLobby.bind(this),
    IGNORED: (node: any) => {},
    UNKNOWN: (node: any) => {
      // Logger.warn('ChallengeListModifier UNKNOWN domEntityType', node)
    }
  }

  strategiesForRemovedNodes: Record<domEntityType | string, (node: any) => void > = {}

  constructor(){
    // @ts-ignore
    $(gcSelectors.challengeList.self).observe(this.modifyChallengedTeams.bind(this))
  }

  modifyChallengedTeams(changes: any): void {
    if(changes && changes.length){
      changes.map((change: any) => {
        if(change.addedNodes && change.addedNodes.length) {
          change.addedNodes.forEach((node: any) => {
            const addedNodeType: domEntityType  = this.identifyAddedNode(node)
            const strategy = this.strategiesForNewNodes[addedNodeType]
            strategy && strategy(node)
          })
        }

        if(change.removedNodes && change.removedNodes.length){
          change.removedNodes.forEach((node: any) => {
            const removedNodeType: domEntityType | string  = this.identifyAddedNode(node)
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

    if(isIgnored){
      type = domEntityType.IGNORED
    } else {
      const isLobby = $node.hasClass(cleanSelector(gcSelectors.challengeList.currentLobbyContent))

      if(isLobby){
        type = domEntityType.LOBBY
      }
    }

    return type
  }

  identifyRemovedNode(node: any):  domEntityType | string {
    const $node = $(node)
    let type: domEntityType | string

    const playersClasses = [
      cleanSelector(gcSelectors.lobbies.player.self),
    ]

    const isPlayer = playersClasses.some((selector) => $node.hasClass(selector))

    if(isPlayer) {
      type = domEntityType.PLAYER
    } else {
      type = domEntityType.IGNORED
    }

    return type
  }

  reactToNewLobby(node: any){
    this.showKDForLobby(node)
  }

  showPlayerKD(playerNode: any) {
    if( BrowserStorage.settings.options?.showChallengeListKDR ){
      const { $el: $player, kdr, id: playerId } = playerNode.$el ? playerNode : serializer.serializePlayer(playerNode)
      const $kdrElement = $player!.find(gcSelectors.extension.kdr)
      const containerName = `gcc-challenged-player-${playerId}`

      if ( typeof kdr !== 'undefined') {
        if($kdrElement.length === 0){
          const $kdBooster = `<div id='${containerName}' class='${cleanSelector(gcSelectors.extension.appContainer)}' style="padding-bottom: 5px;"></div>`
          $player!.prepend( $kdBooster )
          createApp(KDRComponent, { value: kdr }).mount(`#${containerName}`)
        }
      }
    }
  }

  showKDForLobby(lobbyNode: any): void {
    const { players } = serializer.serializeChallengedLobby(lobbyNode)
    players?.map( (player) => this.showPlayerKD(player))
  }
}