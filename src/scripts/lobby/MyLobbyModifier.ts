  // @ts-check
import { cleanSelector } from '@/utils/StringUtils'
import $ from 'jquery'
import { domEntityType } from './domain/domEntityType'
import { createApp, reactive, ref } from 'vue'
import KDRComponent from '../../components/KDR.vue'
import GCChallengerComponent from '../../components/Challenger.vue'
import { gcSelectors } from '../../utils/gcSelectors'
import serializer from './serializer'
import lobbyFilter from './lobbyFilter'
import Logger from 'js-logger'
import LobbyPlayer from './domain/LobbyPlayer'
import { FULL_LOBBY_PLAYERS_NUMBER } from '@/utils/magicNumbers'
import BrowserStorage from '../../utils/storage'

export default class MyLobbyModifier {

  challenger: any
  lobby: any

  strategiesForNewNodes: Record<domEntityType | string, (node: any) => void > = {
    PLAYER: this.reactToNewPlayer.bind(this),
    LOBBY: this.reactToLobbyCreation.bind(this),
    MY_LOBBY_CONTENT: this.insertChallengerComponent.bind(this),
    IGNORED: (node: any) => {},
    UNKNOWN: (node: any) => {
      // Logger.warn('MyLobbyModifier strategiesForNewNodes UNKNOWN domEntityType', node)
    },
  }

  strategiesForRemovedNodes: Record<domEntityType | string, (node: any) => void > = {
    PLAYER: this.reactToRemovedPlayer.bind(this),
    MY_LOBBY_CONTENT: this.reactToRemovedMyLobbyContent.bind(this),
    UNKNOWN: (node: any) => {
      // Logger.warn('MyLobbyModifier strategiesForRemovedNodes UNKNOWN domEntityType', node)
    },
  }

  constructor(){
    // @ts-ignore
    $(gcSelectors.myLobby.root).observe(this.modify.bind(this))
  }

  modify(changes: any): void {
    if(changes && changes.length){
      changes.map((change: any) => {
        if(change.addedNodes && change.addedNodes.length) {
          change.addedNodes.forEach((node: any) => {
            const addedNodeType: domEntityType | string  = this.identifyAddedNode(node)
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

  identifyAddedNode(node: any): domEntityType | string {
    let type: domEntityType | string = domEntityType.UNKNOWN
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
      } else if($node.hasClass(cleanSelector(gcSelectors.myLobby.contentContainer))) {
        type = 'MY_LOBBY_CONTENT'
      }
    }

    return type
  }

  identifyRemovedNode(node: any):  domEntityType | string {
    const $node = $(node)
    let type: domEntityType | string

    const playersClasses = [
      cleanSelector(gcSelectors.myLobby.adminPlayer.self),
      cleanSelector(gcSelectors.myLobby.player.self)
    ]

    const isPlayer = playersClasses.some((selector) => $node.hasClass(selector))

    if(isPlayer) {
      type = domEntityType.PLAYER
    } else if ($node.hasClass(cleanSelector( gcSelectors.myLobby.contentContainer ))) {
      type = 'MY_LOBBY_CONTENT'
    } else {
      type = domEntityType.UNKNOWN
    }

    return type
  }

  reactToLobbyCreation(node: any) {
    this.lobby = serializer.serializeMyLobby(node)
    this.lobby.players?.map( (player: Partial<LobbyPlayer>) => this.reactToNewPlayer(player.$el?.[0]) )
  }

  reactToNewPlayer(node: any) {
    this.showPlayerKD(node)
    this.updateChallengerProps()
  }

  reactToRemovedPlayer(node: any) {
    this.updateChallengerProps()
  }

  reactToRemovedMyLobbyContent() {
    clearInterval(this.challenger?.challengesIntervalId)
    this.challenger = undefined
    this.lobby = undefined
  }

  updateChallengerProps(){
    if(this.challenger) {
      this.refreshLobbyInfos()
      this.challenger.isEnabled = this.lobby?.players?.length === FULL_LOBBY_PLAYERS_NUMBER
    }
  }

  showPlayerKD(playerNode: any) {
    if( BrowserStorage.settings.options?.showMyLobbyKDR ){
      const { $el: $player, kdr, id: playerId } = serializer.serializePlayer(playerNode, gcSelectors.myLobby.player)
      const $kdrElement = $player!.find(gcSelectors.extension.kdr)
      const containerName = `gcc-my-lobby-player-${playerId}`

      if ( typeof kdr !== 'undefined' && $kdrElement.length === 0) {
        const $kdBooster = `<div id='${containerName}' class='${cleanSelector(gcSelectors.extension.appContainer)} padding-top'></div>`
        $player!.append( $kdBooster )
        createApp(KDRComponent, { value: kdr }).mount(`#${containerName}`)
      }
    }
  }

  insertChallengerComponent(node: any){
    this.refreshLobbyInfos()
    const $inviteButton = $( gcSelectors.myLobby.inviteButton )
    const $sideBarTitleContainer = $( node ).find( gcSelectors.myLobby.title )
    const isLobbyAdmin = $inviteButton.length > 0
    const containerName = `gcc-my-lobby-challenger-container`

    if(isLobbyAdmin && !this.challenger) {
      const appContainer = `<div id='${containerName}' class='${cleanSelector(gcSelectors.extension.appContainer)} padding-top'></div>`
      $sideBarTitleContainer.append( appContainer )
      this.challenger = createApp(GCChallengerComponent,  {
        enabled: this.lobby.players?.length === FULL_LOBBY_PLAYERS_NUMBER
      }).mount(`#${containerName}`)
    }

  }

  refreshLobbyInfos() {
    const $lobby = $( gcSelectors.myLobby.root )
    this.lobby = serializer.serializeMyLobby($lobby[0])
  }

}