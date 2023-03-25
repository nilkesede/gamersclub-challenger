import $ from 'jquery'
import { gcSelectors } from '@/apps/shared/extras/gc/selectors'
import { createApp } from 'vue'
import GCCFiltersBar from '@/components/GCCFiltersBar.vue'

export default class FiltersModifier {

  constructor() {
    this.modifyFilters()
  }

  modifyFilters() {
    this.insertFiltersBar()
  }

  insertFiltersBar(){
    const $filtersContainer = $(gcSelectors.lobbies.filters.container)
    const containerId = `gcc-filters-bar-container`
    const $filtersBar = $filtersContainer.find(containerId)
    const $container = $('<div>', {
      id: containerId,
      class: gcSelectors.extension.appContainer.cleanCSSSelector()
    })

    if ($filtersBar.length === 0) {
      $filtersContainer.append($container)
      createApp(GCCFiltersBar).mount(`#${containerId}`)
    }
  }
}