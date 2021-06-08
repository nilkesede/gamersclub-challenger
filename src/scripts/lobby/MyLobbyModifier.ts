  // @ts-check
import { cleanSelector } from '@/utils/StringUtils'
import $ from 'jquery'
import { domEntityType } from './domain/domEntityType'
import { createApp } from 'vue'
import KDRComponent from '../../components/KDR.vue'
import { gcSelectors } from './gcSelectors'
import lobbySerializer from './lobbySerializer'
import lobbyFilter from './lobbyFilter'

export default class MyLobbyModifier {

  strategiesForNewNodes: Record<domEntityType, (node: any) => void > = {
    PLAYER: this.reactToNewPlayer.bind(this),
    LOBBY: this.reactToLobbyCreation.bind(this),
    IGNORED: (node: any) => {},
    UNKNOWN: (node: any) => {
      console.warn('MyLobbyModifier UNKNOWN domEntityType', node)
    }
  }

  constructor(){
    // @ts-ignore
    $(gcSelectors.myLobby.root).observe(this.modify.bind(this))

    // this.insertChallengerComponent()
  }

  modify(changes: any): void {
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
    ]
    const playersClasses = [
      cleanSelector(gcSelectors.myLobby.adminPlayer.self),
      cleanSelector(gcSelectors.myLobby.player.self)
    ]

    const isIgnored = ignoredSelectors.some((selector) => $node.hasClass(selector))

    if(isIgnored){
      type = domEntityType.IGNORED
    } else {
      const isPlayer = playersClasses.some((selector) => $node.hasClass(selector))

      if($node.hasClass('sidebar-sala-players')){
        type = domEntityType.LOBBY
      } else if(isPlayer) {
        type = domEntityType.PLAYER
      }
    }

    return type
  }

  reactToLobbyCreation(node: any) {
    const { players } = lobbySerializer.serializeMyLobby(node)
    players?.map( (player) => this.reactToNewPlayer(player.$el?.[0]) )
  }

  reactToNewPlayer(node: any) {
    this.showPlayerKD(node)
  }

  showPlayerKD(playerNode: any) {
    const { $el: $player, kdr, id: playerId } = lobbySerializer.serializePlayer(playerNode, gcSelectors.myLobby.player)
    const $kdrElement = $player!.find(gcSelectors.extension.kdr)
    const containerName = `gcc-my-lobby-player-${playerId}`

    if ( typeof kdr !== 'undefined' && $kdrElement.length === 0) {
      const $kdBooster = `<div id='${containerName}' class='${cleanSelector(gcSelectors.extension.appContainer)} padding-top'></div>`
      $player!.append( $kdBooster )
      createApp(KDRComponent, { value: kdr }).mount(`#${containerName}`)
    }
  }

  insertChallengerComponent(){
    const $inviteButton = $( gcSelectors.myLobby.inviteButton )
    const isLobbyAdmin = $inviteButton.length > 0
    const containerName = `gcc-my-lobby`

    if(isLobbyAdmin) {
      const $kdBooster = `<div id='${containerName}' class='${cleanSelector(gcSelectors.extension.appContainer)} padding-top'></div>`
      $player!.append( $kdBooster )
      createApp(KDRComponent).mount(`#${containerName}`)
    }

  }

}