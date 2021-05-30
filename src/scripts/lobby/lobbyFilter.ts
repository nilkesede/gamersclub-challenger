
import { GCCFilters } from './domain/gccFilters'
import { gcSelectors } from './gcSelectors'
import LobbySerializer from './lobbySerializer'
import $ from 'jquery'
import { cleanSelector } from '@/utils/StringUtils'

class LobbyFilter {
  filters: GCCFilters = { kdr: 1.2 }

  cosntructor(){}

  filter(gccFilters: GCCFilters) {
    this.filters = gccFilters
    const lobbiesElements = $(gcSelectors.lobby).get()
    lobbiesElements.map(this.reactToFilter.bind(this))
  }

  reactToFilter(lobbyNode: any){
    const { players, $el, id } = LobbySerializer.serialize(lobbyNode)
    const krdFilter = this.filters.kdr
    const $room = $el?.hasClass(cleanSelector(gcSelectors.lobby)) ? $el : $el?.closest(gcSelectors.lobby)
    const validLobby: boolean | undefined = players?.every((player) => { return player.kdr as number < krdFilter })

    if(validLobby) {
      $room?.removeClass('gcc-hide')
    } else {
      $room?.addClass('gcc-hide')
    }
  }






}

export default new LobbyFilter()