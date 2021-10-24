
import { GCCFilters } from './domain/gccFilters'
import { gcSelectors } from '../../utils/gcSelectors'
import Serializer from './serializer'
import $ from 'jquery'
import { cleanSelector } from '@/utils/StringUtils'
import browserStorage from '@/utils/storage'
import Logger from 'js-logger'

const KDR_MAX_LIMIT = 2

class LobbyFilter {
  filters: Partial<GCCFilters> = { kdr: browserStorage.defaultSettings.filters!.kdr }

  setup() {
    this.filters = browserStorage.settings.filters!
    this.filters.playerName = ''
    Logger.debug('🧪 Recovered saved filters', this.filters)
  }

  async filter(gccFilters: GCCFilters) {
    Logger.debug('🧪 Filtered lobbies', gccFilters)
    Object.assign(this.filters, gccFilters)

    const lobbiesElements = $(gcSelectors.lobby).get()
    lobbiesElements.map(this.reactToFilter.bind(this))

    await browserStorage.updateSettings()
  }

  reactToFilter(lobbyNode: any){
    const { players, $el } = Serializer.serialize(lobbyNode)
    const $room = $el?.hasClass(cleanSelector(gcSelectors.lobby)) ? $el : $el?.closest(gcSelectors.lobby)
    let validLobby: boolean | undefined = true
    const cleanHiddenSelector = cleanSelector(gcSelectors.extension.hidden)

    if(typeof this.filters.kdr !== 'undefined' && players && browserStorage.settings.options?.enableKDRFilter){
      validLobby = players.every((player) => {
        return this.filters.kdr! >= KDR_MAX_LIMIT || player.kdr as number <= this.filters.kdr!
      })
    }

    if(validLobby && players && this.filters.playerName && browserStorage.settings.options?.enableNameFilter){
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