import { cleanSelector, getIdByAvatarUrl } from "@/shared/plugins/string.setup"
import Lobby from "./types/Lobby"
import LobbyPlayer from "./types/LobbyPlayer"
import { gcSelectors } from "@/apps/shared/extras/gc/selectors"
import $ from 'jquery'
import { playerSelectors } from "./types/playerSelectors"
import Logger from 'js-logger'
import LoggedUser from "./types/LoggedUser"

class Serializer {
  serialize(lobbyNode: any): Partial<Lobby> {
    const $lobby = $(lobbyNode)
    const $room = $lobby?.hasClass(cleanSelector(gcSelectors.lobbies.self)) ? $lobby : $lobby?.closest(gcSelectors.lobbies.self)
    const lobbyId = $room.attr('id')

    if (!lobbyId) {
      Logger.warn('Cannot find lobby id', $room[0])
    }

    const players = $room.find(gcSelectors.lobbies.player.self)
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
    const $room = $(lobbyNode)
    const lobbyId = $room.attr('id')

    if (!lobbyId) {
      Logger.warn('Cannot find challengedLobby id', $room[0])
    }

    const players = $room.find(gcSelectors.lobbies.player.self)
    const realPlayers = players.get().filter((node) => !$(node).hasClass(cleanSelector(gcSelectors.lobbies.player.placeHolder)))
    const serializedPlayers = this.serializePlayers(realPlayers, gcSelectors.challengeList.player)

    return {
      $el: $room,
      id: lobbyId,
      players: serializedPlayers,
      name: $room.find(gcSelectors.lobbies.title)?.text()
    }
  }

  serializeTeam(lobbyNode: any): Partial<Lobby> {
    const $room = $(lobbyNode)

    const players = $room.find(gcSelectors.teamPage.player.self)
    const realPlayers = players.get().filter((node) => !$(node).hasClass(cleanSelector(gcSelectors.lobbies.player.placeHolder)))
    const serializedPlayers = this.serializePlayers(realPlayers, gcSelectors.teamPage.player)

    return {
      $el: $room,
      id: undefined,
      players: serializedPlayers,
      name: $room.find(gcSelectors.lobbies.title)?.text()
    }
  }

  serializeMyLobby(lobbyNode: any): Partial<Lobby> {
    const $lobby = $(lobbyNode)
    const $room = $lobby?.hasClass(cleanSelector(gcSelectors.myLobby.root)) ? $lobby : $lobby?.closest(gcSelectors.myLobby.root)

    const players = $room.find(gcSelectors.myLobby.player.self)
    const serializedPlayers = players.get().map((node) => this.serializePlayer(node, gcSelectors.myLobby.player))

    return {
      $el: $room,
      players: serializedPlayers
    }
  }

  serializePreMatchLobby(lobbyNode: any): Partial<Lobby> {
    const $room = $(lobbyNode)

    const players = $room.find(gcSelectors.preMatchModal.lobby.player.self)
    const realPlayers = players.get().filter((node) => !$(node).hasClass(cleanSelector(gcSelectors.lobbies.player.placeHolder)))
    const serializedPlayers = this.serializePlayers(realPlayers, gcSelectors.preMatchModal.lobby.player)

    return {
      $el: $room,
      id: undefined,
      players: serializedPlayers,
      name: $room.find(gcSelectors.lobbies.title)?.text()
    }
  }

  serializePlayers(nodes: any, selectors?: playerSelectors): Partial<LobbyPlayer>[] {
    const players: Partial<LobbyPlayer>[] = nodes.map((node: any) => this.serializePlayer(node, selectors))

    const realPlayers = players?.filter((player) => {
      return selectors?.placeHolder ? !player.$el?.hasClass(cleanSelector(selectors?.placeHolder)) : true
    })

    return realPlayers
  }

  serializePlayer(playerNode: any, selectors: playerSelectors = gcSelectors.lobbies.player): Partial<LobbyPlayer> {
    const $player = $(playerNode)

    const playerAvatarLink = $player.find(selectors.avatarLink)
    const title = playerAvatarLink.attr('title')
    const avatarSrc = playerAvatarLink.prop('tagName') === 'IMG' ? playerAvatarLink.attr('src') : playerAvatarLink.attr('href')
    let playerId: string | undefined = undefined
    if(!avatarSrc?.includes('steamcdn')){
      playerId = playerAvatarLink.prop('tagName') === 'IMG' ? avatarSrc?.split('/')[5] : avatarSrc?.split('/')[2]
    }
    let playerName: string | undefined = undefined
    let kdr: number | undefined = undefined

    if (title) {
      const kdrIndex = title.indexOf('| KDR:')
      playerName = title.substring(0, kdrIndex).trim()

      let kd: any = title.match(/KDR: [0-9]+(.?[0-9]+)?/)
      kd = kd || ['']
      kdr = parseFloat(kd[0].split(':')[1].trim())

    } else {
      if (!$player.hasClass(cleanSelector(gcSelectors.lobbies.player.placeHolder))) {
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