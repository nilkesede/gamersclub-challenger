import $ from 'jquery'
import { gcSelectors } from '../../utils/gcSelectors'
import KDRFilterComponent from '../../components/KDRFilter.vue'
import LobbyNameFilterComponent from '../../components/LobbyNameFilter.vue'
import Vue, { createApp } from 'vue'
import { cleanSelector } from '@/utils/StringUtils'

export default class FiltersModifier {

  constructor() {
    this.modifyFilters()
    this.insertLobbyNameFilter()
  }

  modifyFilters(){
    const $filtersContainer = $(gcSelectors.filtersContainer)
    const sectionModel = $filtersContainer.find(gcSelectors.filterSection).get(0)

    const $gccFilterSection = $(sectionModel).clone()
    $gccFilterSection.addClass(cleanSelector(gcSelectors.extension.kdrFilterLabel))
    $filtersContainer.append($gccFilterSection)

    createApp(KDRFilterComponent, { value: 1.2 }).mount($gccFilterSection.get(0))
  }

  insertLobbyNameFilter() {
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