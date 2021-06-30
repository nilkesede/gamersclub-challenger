
import { GCCFilters } from './domain/gccFilters'
import { gcSelectors } from '../../utils/gcSelectors'
import LobbySerializer from './lobbySerializer'
import $ from 'jquery'
import { cleanSelector } from '@/utils/StringUtils'

const KDR_MAX_LIMIT = 2

class LobbyFilter {
  filters: GCCFilters = { kdr: 1.2 }

  cosntructor(){}

  filter(gccFilters: GCCFilters) {
    this.filters = { ...this.filters, ...gccFilters }
    const lobbiesElements = $(gcSelectors.lobby).get()
    lobbiesElements.map(this.reactToFilter.bind(this))
  }

  reactToFilter(lobbyNode: any){
    const { players, $el, id } = LobbySerializer.serialize(lobbyNode)
    const $room = $el?.hasClass(cleanSelector(gcSelectors.lobby)) ? $el : $el?.closest(gcSelectors.lobby)
    let validLobby: boolean | undefined = true
    const cleanHiddenSelector = cleanSelector(gcSelectors.extension.hidden)

    if(typeof this.filters.kdr !== 'undefined' && players){
      validLobby = players.every((player) => {
        return this.filters.kdr! >= KDR_MAX_LIMIT || player.kdr as number <= this.filters.kdr!
      })
    }

    if(validLobby && players && this.filters.playerName){
      validLobby = players.some( player => {
        return player.name && player.name.toLowerCase().indexOf(this.filters.playerName!.toLowerCase().trim()) > -1;
      });
    }

    if(validLobby) {
      $room?.removeClass(cleanHiddenSelector)
    } else {
      $room?.addClass(cleanHiddenSelector)
    }
  }

}

export default new LobbyFilter()