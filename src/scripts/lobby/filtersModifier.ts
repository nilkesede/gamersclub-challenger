import $ from 'jquery'
import { gcSelectors } from '../../utils/gcSelectors'
import KDRFilterComponent from '../../components/KDRFilter.vue'
import LobbyNameFilterComponent from '../../components/LobbyNameFilter.vue'
import { createApp } from 'vue'
import { cleanSelector } from '@/utils/StringUtils'
import gcBooster from '@/utils/gcBooster'
import lobbyFilter from './lobbyFilter'
import BrowserStorage from '../../utils/storage'

export default class FiltersModifier {

  constructor() {
    this.modifyFilters()
  }

  modifyFilters(){
    this.insertKDRFilter()
    this.insertLobbyNameFilter()
  }

  insertLobbyNameFilter() {
    if( BrowserStorage.settings.options?.enableNameFilter ){
      const $roomsContent = $( gcSelectors.lobbies.content )
      const containerName = `gcc-lobby-player-filter-container`
      const $container = `<div id='${containerName}' class='${cleanSelector(gcSelectors.extension.appContainer)}'></div>`
      const $lobbyFilter = $roomsContent.find(containerName)

      if($lobbyFilter.length === 0){
        $roomsContent.prepend($container)
        createApp(LobbyNameFilterComponent).mount(`#${containerName}`)
      }
    }
  }

  insertKDRFilter() {
    if( BrowserStorage.settings.options?.enableKDRFilter ) {
      const $filtersContainer = $(gcSelectors.filtersContainer)
      const sections = $filtersContainer.find(gcSelectors.filterSection)
      const sectionModel = sections.get(0)
      const $gccFilterSection = $(sectionModel!).clone()
      const cleanContainerClass = cleanSelector(gcSelectors.extension.kdrFilterContainer)

      gcBooster.isInstalled()
        .finally(() => {
          $gccFilterSection.addClass(cleanContainerClass)
          $filtersContainer.get(0)!.append($gccFilterSection[0])
          createApp(KDRFilterComponent, { value: lobbyFilter.filters.kdr || BrowserStorage.defaultSettings.filters?.kdr }).mount($gccFilterSection.get(0)!)
        })
    }
  }
}