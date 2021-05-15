  // @ts-check
import $ from 'jquery'
import { domEntityType } from './domEntityType'

const selectors = {
  list: '.list-avaliable-teams',
  lobby: '.lobby-room-list-item',
  player: '.sala-lineup-player',
  playerAvatarLink: '.gc-avatar a',

  extension: {
    kdr: '.cgc-kdr'
  }
}

export default class TeamsModifier {

  constructor(){
    // Initial lobbies
    $(selectors.lobby).each((index, element) => this.reactToNewLobby(element))

    // @ts-ignore
    $(selectors.list).observe(this.modifyAvailableTeams.bind(this))

    //setTimeout(stopObserve, 5000)
    //stopObserve.disconnect()
  }

  modifyAvailableTeams(changes: any): void {
    const strategiesForNewNodes: Record<domEntityType, (node: any) => void > = {
      PLAYER: this.reactToNewPlayer.bind(this),
      LOBBY: this.reactToNewLobby.bind(this),
      UNKNOWN: (node: any) => {}
    }

    if(changes && changes.length){
      changes.map((change: any) => {
        if(change.addedNodes && change.addedNodes.length) {
          change.addedNodes.forEach((node: any) => {
            const addedNodeType: domEntityType  = this.identifyAddedNode(node)
            const strategy = strategiesForNewNodes[addedNodeType]
            strategy && strategy(node)
          })
        }
      })
    }
  }

  identifyAddedNode(node: any): domEntityType {
    let type = domEntityType.UNKNOWN
    const $node = $(node)
    if($node.hasClass(selectors.player.replace(/\./g, ''))){
      type = domEntityType.PLAYER
    } else if($node.hasClass(selectors.lobby.replace(/\./g, ''))) {
      type = domEntityType.LOBBY
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

    if ( title ) {
      const kdrIndex = title.indexOf('KDR:');
      const playerName = title.substring(0, kdrIndex);

      let kd: any = title.match(/KDR: [0-9]+.?[0-9]+/)  // Há alguns nicks que podem ter | neles. Posso usar a regex /KDR: [0-9]+.?[0-9]+/
      kd = kd || ['']
      const shortKd = kd[0].split( ':' )[1].trim()

      console.log( '==>', playerName, shortKd )

      if($kdrElement.length === 0){
        const $kdBooster = $( `<div class='cgc-kdr'>${shortKd}</div>` )
        $kdBooster.css( {
          backgroundColor: 'black',
          color: 'white',
          padding: '5',
          fontSize: '10px',
          width: '100%'
        } )

        $player.prepend( $kdBooster )
      }

    }
  }

  showKDForLobby(nodes: any): void {
    console.log('showKDForAvailableTeams changes', nodes)
    const players = $( nodes ).find( selectors.player )
    players.get().map( this.reactToNewPlayer.bind(this) )
  }
}