import $ from 'jquery'
import { gcSelectors } from './gcSelectors'
import KDRFilterComponent from '../../components/KDRFilter.vue'
import Vue, { createApp } from 'vue'
import { cleanSelector } from '@/utils/StringUtils'

export default class FiltersModifier {

  constructor() {
    this.modifyFilters()
  }

  modifyFilters(){
    const $filtersContainer = $(gcSelectors.filtersContainer)
    const sectionModel = $filtersContainer.find(gcSelectors.filterSection).get(0)

    const $gccFilterSection = $(sectionModel).clone()
    $gccFilterSection.addClass(cleanSelector(gcSelectors.extension.kdrFilterLabel))
    $filtersContainer.append($gccFilterSection)

    createApp(KDRFilterComponent, { value: 1.2 }).mount($gccFilterSection.get(0))
  }
}