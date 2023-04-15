// @ts-check
import $ from 'jquery'
import { createApp } from 'vue'
import { gcSelectors } from '@/apps/shared/extras/gc/tools/selectors'
import LobbyPlayer from '@/apps/contentScripts/lobby/types/LobbyPlayer'
import { getIdByAvatarUrl } from '@/apps/shared/extras/gc/tools/utils/getIdByAvatarUrl'
import GCCMarkComponent from '@/apps/shared/components/GCCMarks.vue'

export default class PostMatchModifier {
  lobby: any
  preMatchIntervalHolder: number | undefined

  constructor() {
    setTimeout(() => {
      $(gcSelectors.match.tableMatchContainer.player.leftColumn).each((index, node) => {
        this.reactToPlayer(node)
      })
    }, 800)
  }

  reactToPlayer(playerNode: any) {
    const $playerNode = $(playerNode)
    const $avatar = $(playerNode).find(gcSelectors.match.tableMatchContainer.player.avatarLink)
    const name = $playerNode.find(gcSelectors.match.tableMatchContainer.player.name).text()
    const playerId = getIdByAvatarUrl($avatar.attr('src')!)
    const lobbyPlayer = {
      $el: $playerNode,
      id: playerId,
      name,
    }

    this.showMarks(lobbyPlayer)
  }

  showMarks(lobbyPlayer: Partial<LobbyPlayer>) {
    const { $el: $player, kdr, id: playerId, name } = lobbyPlayer
    const $markElement = $player!.find(gcSelectors.extension.marks.self)
    const containerName = `gcc-mark-container-${playerId}`

    if ($markElement.length === 0) {
      const $container = `<div id='${containerName}' class='${gcSelectors.extension.appContainer.cleanCSSSelector()} gcc-mark-post-match-container'></div>`
      $player!.append($container)
      createApp(GCCMarkComponent, { playerName: name, playerId, enableAddButton: true }).mount(`#${containerName}`)
    }
  }

}