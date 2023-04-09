// @ts-check
import $ from 'jquery'
import { createApp } from 'vue'
import { gcSelectors } from '@/apps/shared/extras/gc/tools/selectors'
import LobbyPlayer from '@/apps/contentScripts/lobby/types/LobbyPlayer'
import GCCMarkComponent from '@/apps/shared/components/GCCMarks.vue'

export default class PlayerProfileModifier {
  lobby: any
  preMatchIntervalHolder: number | undefined

  constructor() {
    setTimeout(() => {
      this.reactToPlayer()
    }, 800)
  }

  reactToPlayer() {
    const $el = $(gcSelectors.playerPage.profileContainer)
    const name = $(gcSelectors.playerPage.userName).text()
    const playerId = $(gcSelectors.playerPage.userId).text().split('ID: ')[1]
    const lobbyPlayer = {
      $el,
      id: playerId,
      name,
    }
    this.showMarks(lobbyPlayer)
  }

  showMarks(lobbyPlayer: Partial<LobbyPlayer>) {
    const { $el: $player, id: playerId, name } = lobbyPlayer
    const $markElement = $player!.find(gcSelectors.extension.marks.self)
    const containerName = `gcc-mark-container-${playerId}`

    if ($markElement.length === 0) {
      const $container = $('<div></div>', {
        id: containerName,
        class: `${gcSelectors.extension.appContainer.cleanCSSSelector()} gcc-mark-post-match-container padding-top`
      })

      $player!.after($container)
      createApp(GCCMarkComponent, { playerName: name, playerId, enableAddButton: true }).mount(`#${containerName}`)
    }
  }

}