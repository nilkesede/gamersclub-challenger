import { cleanSelector, getIdByAvatarUrl } from "@/utils/StringUtils"
import Lobby from "./domain/Lobby"
import LobbyPlayer from "./domain/LobbyPlayer"
import { gcSelectors } from "../../utils/gcSelectors"
import $ from 'jquery'
import { playerSelectors } from "./domain/playerSelectors"
import Logger from 'js-logger'
import LoggedUser from "./domain/LoggedUser"

class Serializer {
  serialize(lobbyNode: any): Partial<Lobby> {
    const $lobby = $( lobbyNode )
    const $room = $lobby?.hasClass(cleanSelector(gcSelectors.lobby)) ? $lobby : $lobby?.closest(gcSelectors.lobby)
    const lobbyId = $room.attr('id')

    if(!lobbyId) {
      Logger.warn('Cannot find lobby id', $room[0])
    }

    const players = $room.find( gcSelectors.lobbies.player.self )
    const realPlayers = players.get().filter((node) => !$(node).hasClass(cleanSelector(gcSelectors.lobbies.player.placeHolder)))
    const serializedPlayers = this.serializePlayers(realPlayers)

    return {
      $el: $room,
      id: lobbyId,
      players: serializedPlayers,
      name: $lobby.find(gcSelectors.lobbies.title)?.text()
    }
  }

  serializeChallengedLobby(lobbyNode: any): Partial<Lobby> {
    const $room = $( lobbyNode )
    const lobbyId = $room.attr('id')

    if(!lobbyId) {
      Logger.warn('Cannot find challengedLobby id', $room[0])
    }

    const players = $room.find( gcSelectors.lobbies.player.self )
    const realPlayers = players.get().filter((node) => !$(node).hasClass(cleanSelector(gcSelectors.lobbies.player.placeHolder)))
    const serializedPlayers = this.serializePlayers(realPlayers, gcSelectors.challengeList.player)

    return {
      $el: $room,
      id: lobbyId,
      players: serializedPlayers,
      name: $room.find(gcSelectors.lobbies.title)?.text()
    }
  }

  serializeMyLobby(lobbyNode: any): Partial<Lobby> {
    const $lobby = $( lobbyNode )
    const $room = $lobby?.hasClass(cleanSelector(gcSelectors.myLobby.root)) ? $lobby : $lobby?.closest(gcSelectors.myLobby.root)

    const players = $room.find( gcSelectors.myLobby.player.self )
    const serializedPlayers = players.get().map((node) => this.serializePlayer(node, gcSelectors.myLobby.player))

    return {
      $el: $room,
      players: serializedPlayers
    }
  }

  serializePlayers(nodes: any, selectors?: playerSelectors) : Partial<LobbyPlayer>[] {
    const players: Partial<LobbyPlayer>[] = nodes.map((node: any) => this.serializePlayer(node, selectors))

    const realPlayers = players?.filter((player) => {
      return !player.$el?.hasClass(cleanSelector(gcSelectors.lobbies.player.placeHolder))
    })

    return realPlayers
  }

  serializePlayer(playerNode: any, selectors: playerSelectors = gcSelectors.lobbies.player): Partial<LobbyPlayer> {
    const $player = $( playerNode )

    const playerAvatarLink = $player.find( selectors.avatarLink )
    const title = playerAvatarLink.attr( 'title' )
    const playerId = playerAvatarLink.attr('href')?.split('/')[2]
    let playerName = undefined
    let kdr = undefined

    if ( title ) {
      const kdrIndex = title.indexOf('KDR:')
      playerName = title.substring(0, kdrIndex)

      let kd: any = title.match(/KDR: [0-9]+(.?[0-9]+)?/)
      kd = kd || ['']
      kdr = parseFloat( kd[0].split( ':' )[1].trim() )

    } else {
      if(!$player.hasClass(cleanSelector(gcSelectors.lobbies.player.placeHolder))){
        Logger.warn('[serializePlayer] There is no TITLE', playerNode)
      }
    }

    return {
      id: playerId,
      $el: $player,
      name: playerName,
      kdr,
    }
  }

  serializeLoggedPlayer(): Partial<LoggedUser> {
    const userAvatarUrl = $(gcSelectors.loggedUser.avatar).attr('src')
    const userId = userAvatarUrl ? getIdByAvatarUrl(userAvatarUrl) : undefined
    const name = $(gcSelectors.loggedUser.name).text().trim()
    const level = $(gcSelectors.loggedUser.level).text().trim()

    return {
      id: userId,
      name,
      level,
      avatarUrl: userAvatarUrl
    }
  }
}

export default new Serializer()