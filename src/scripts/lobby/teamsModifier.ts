  // @ts-check
import { cleanSelector } from '@/utils/StringUtils'
import $ from 'jquery'
import { domEntityType } from './domain/domEntityType'
import { createApp } from 'vue'
import KDRComponent from '../../components/KDR.vue'
import { gcSelectors } from './gcSelectors'
import lobbySerializer from './lobbySerializer'
import lobbyFilter from './lobbyFilter'

export default class TeamsModifier {

  strategiesForNewNodes: Record<domEntityType, (node: any) => void > = {
    PLAYER: this.reactToNewPlayer.bind(this),
    LOBBY: this.reactToNewLobby.bind(this),
    IGNORED: (node: any) => {},
    UNKNOWN: (node: any) => {
      console.warn('TeamsModifier UNKNOWN domEntityType', node)
    }
  }

  constructor(){
    // Initial lobbies
    $(gcSelectors.lobby).each((index, element) => this.reactToNewLobby(element))

    // @ts-ignore
    $(gcSelectors.list).observe(this.modifyAvailableTeams.bind(this))

    //setTimeout(stopObserve, 5000)
    //stopObserve.disconnect()
  }

  modifyAvailableTeams(changes: any): void {
    if(changes && changes.length){
      changes.map((change: any) => {
        if(change.addedNodes && change.addedNodes.length) {
          change.addedNodes.forEach((node: any) => {
            const addedNodeType: domEntityType  = this.identifyAddedNode(node)
            const strategy = this.strategiesForNewNodes[addedNodeType]
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
      cleanSelector(gcSelectors.playerPlaceHolder)
    ]

    const isIgnored = ignoredSelectors.some((selector) => $node.hasClass(selector))

    if(isIgnored){
      type = domEntityType.IGNORED
    } else {
      const isLobby = $node.hasClass(cleanSelector(gcSelectors.lobby)) || $node.find('.sala-card').length > 0

      if(isLobby){
        type = domEntityType.LOBBY
      } else if($node.hasClass(cleanSelector(gcSelectors.player))) {
        type = domEntityType.PLAYER
      }
    }

    return type
  }

  reactToNewLobby(node: any){
    this.showKDForLobby(node)
    lobbyFilter.reactToFilter.call(lobbyFilter, node)
  }

  reactToNewPlayer(node: any){
    this.showPlayerKD(node)
    const $lobby = $(node).closest(gcSelectors.lobby)
    lobbyFilter.reactToFilter.call(lobbyFilter, $lobby[0])
  }

  showPlayerKD(playerNode: any) {
    const { $el: $player, kdr, id: playerId } = lobbySerializer.serializePlayer(playerNode)
    const $kdrElement = $player!.find(gcSelectors.extension.kdr)
    const containerName = `gcc-${playerId}`

    if ( typeof kdr !== 'undefined') {
      if($kdrElement.length === 0){
        const $kdBooster = `<div id='${containerName}' class='${cleanSelector(gcSelectors.extension.appContainer)}'></div>`
        $player!.prepend( $kdBooster )
        createApp(KDRComponent, { value: kdr }).mount(`#${containerName}`)
      }
    }
  }

  showKDForLobby(lobbyNode: any): void {
    const { players } = lobbySerializer.serialize(lobbyNode)
    players?.map( (player) => this.reactToNewPlayer(player.$el?.[0]) )
  }
}