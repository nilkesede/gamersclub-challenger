import { cleanSelector } from "@/utils/StringUtils"
import Lobby from "./domain/Lobby"
import LobbyPlayer from "./domain/LobbyPlayer"
import { gcSelectors } from "./gcSelectors"
import $ from 'jquery'

class LobbySerializer {
  serialize(lobbyNode: any): Partial<Lobby> {
    const $lobby = $( lobbyNode )
    const $room = $lobby?.hasClass(cleanSelector(gcSelectors.lobby)) ? $lobby : $lobby?.closest(gcSelectors.lobby)
    const lobbyId = $room.attr('id')

    if(!lobbyId) {
      console.log('Cannot find lobby id', $room[0])
    }

    const players = $room.find( gcSelectors.player )
    const realPlayers = players.get().filter((node) => !$(node).hasClass(cleanSelector(gcSelectors.playerPlaceHolder)))
    const serializedPlayers = this.serializePlayers(realPlayers)

    return {
      $el: $room,
      id: lobbyId,
      players: serializedPlayers
    }
  }

  serializePlayers(nodes: any) : Partial<LobbyPlayer>[] {
    const players: Partial<LobbyPlayer>[] = nodes.map(this.serializePlayer)

    const realPlayers = players?.filter((player) => {
      return !player.$el?.hasClass(cleanSelector(gcSelectors.playerPlaceHolder))
    })

    return realPlayers
  }

  serializePlayer(playerNode: any): Partial<LobbyPlayer> {
    const $player = $( playerNode )

    const playerAvatarLink = $player.find( gcSelectors.playerAvatarLink )
    const title = playerAvatarLink.attr( 'title' )
    const playerId = playerAvatarLink.attr('href')?.split('/')[2]
    let playerName = undefined
    let kdr = undefined

    if ( title ) {
      const kdrIndex = title.indexOf('KDR:')
      playerName = title.substring(0, kdrIndex)

      let kd: any = title.match(/KDR: [0-9]+.?[0-9]+/)
      kd = kd || ['']
      kdr = parseFloat( kd[0].split( ':' )[1].trim() )

    } else {
      console.warn('[serializePlayer] There is no TITLE', playerNode)
    }

    return {
      id: playerId,
      $el: $player,
      name: playerName,
      kdr,
    }
  }
}

export default new LobbySerializer()