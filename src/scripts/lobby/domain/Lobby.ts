import LobbyPlayer from "./LobbyPlayer";

export default interface Lobby {
  $el: JQuery<any>
  players: Partial<LobbyPlayer>[]
  id: string
}