  // @ts-check
import { cleanSelector } from '@/utils/StringUtils'
import $ from 'jquery'
import { domEntityType } from './domEntityType'
import Vue, { createApp } from 'vue'
import App from '../../App.vue';
import KDRComponent from '../../components/KDR.vue';

const selectors = {
  list: '.list-avaliable-teams',
  lobby: '.lobby-room-list-item',

  player: '.sala-lineup-player',
  playerPlaceHolder: '.player-placeholder',
  playerAvatarLink: '.gc-avatar a',

  extension: {
    appContainer: '.gcc-app-container',
    kdr: '.gcc-kdr'
  }
}

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
    $(selectors.lobby).each((index, element) => this.reactToNewLobby(element))

    // @ts-ignore
    $(selectors.list).observe(this.modifyAvailableTeams.bind(this))

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
      cleanSelector(selectors.extension.appContainer),
      cleanSelector(selectors.extension.kdr),
      cleanSelector(selectors.playerPlaceHolder)
    ]

    const isIgnored = ignoredSelectors.some((selector) => $node.hasClass(selector))

    if(isIgnored){
      type = domEntityType.IGNORED
    } else {
      const isLobby = $node.hasClass(cleanSelector(selectors.lobby)) || $node.find('.sala-card').length > 0

      if(isLobby){
        type = domEntityType.LOBBY
      } else if($node.hasClass(cleanSelector(selectors.player))) {
        type = domEntityType.PLAYER
      }
    }

    return type
  }

  reactToNewLobby(nodes: any){
    this.showKDForLobby(nodes)
  }

  reactToNewPlayer(node: any){
    this.showPlayerKD(node)
  }

  showPlayerKD(playerNode: any) {
    const $player = $( playerNode )
    const playerAvatarLink = $player.find( selectors.playerAvatarLink )
    const title = playerAvatarLink.attr( 'title' )
    const $kdrElement = $player.find(selectors.extension.kdr)
    const playerId = playerAvatarLink.attr('href')?.split('/')[2]
    const containerName = `gcc-${playerId}`

    if ( title ) {
      const kdrIndex = title.indexOf('KDR:')
      const playerName = title.substring(0, kdrIndex)

      let kd: any = title.match(/KDR: [0-9]+.?[0-9]+/)  // Há alguns nicks que podem ter | neles. Posso usar a regex /KDR: [0-9]+.?[0-9]+/
      kd = kd || ['']
      const shortKd = kd[0].split( ':' )[1].trim()

      if($kdrElement.length === 0){
        const $kdBooster = `<div id='${containerName}' class='${cleanSelector(selectors.extension.appContainer)}'></div>`
        $player.prepend( $kdBooster )
        createApp(KDRComponent, { value: parseFloat(shortKd) }).mount(`#${containerName}`)
      }
    } else {
      console.warn('There is no TITLE', playerNode)
    }
  }

  showKDForLobby(lobbyNode: any): void {
    const $lobby = $( lobbyNode )
    const lobbyId = $lobby.attr('id')
    console.info(lobbyId, lobbyNode)

    const players = $lobby.find( '.sala-lineup-player' )
    console.info(lobbyId, 'players', players.length, players)

    const realPlayers = players.get().filter((node) => !$(node).hasClass(cleanSelector(selectors.playerPlaceHolder)))

    console.info(lobbyId, 'real players', realPlayers.length, realPlayers)
    realPlayers.map( this.reactToNewPlayer.bind(this) )
  }
}