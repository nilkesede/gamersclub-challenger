import $ from 'jquery'
import { gcSelectors } from './gcSelectors'
import KDRFilterComponent from '../../components/KDRFilter.vue'
import Vue, { createApp } from 'vue'

export default class FiltersModifier {

  constructor() {
    this.modifyFilters()
  }

  modifyFilters(){
    const $filtersContainer = $(gcSelectors.filtersContainer)
    const sectionModel = $filtersContainer.find(gcSelectors.filterSection).get(0)

    const $gccFilterSection = $(sectionModel).clone()
    $filtersContainer.append($gccFilterSection)

    createApp(KDRFilterComponent, { value: 1.2 }).mount($gccFilterSection.get(0))
  }
}