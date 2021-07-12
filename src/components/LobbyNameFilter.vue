<template>
  <div class="gcc-lobby-name-filter">
    <input
      type="text"
      v-model="modelValue"
      :placeholder="i18n.getMessage('filterByPlayerName')"
      class="gcc-lobby-name-filter__input">
  </div>
</template>

<script lang="ts">
import { Options, Vue, } from 'vue-class-component'
import { ref, watch } from 'vue'
import { gcSelectors } from '../utils/gcSelectors'
import { cleanSelector } from '@/utils/StringUtils'
import VueSlider from 'vue-slider-component'
import lobbyFilter from '@/scripts/lobby/lobbyFilter'
import Logger from 'js-logger'
import AnalyticsManager from '@/utils/AnalyticsManager'
import { analyticsEvents } from '@/utils/analyticsEvents'

declare global {
  interface Window {
    chrome: any;
  }
}

@Options({
  components: {
    VueSlider,
  },

  props: {
    value: String
  }
})
export default class LobbyNameFilter extends Vue {
  value!: string

  data(): any{
    const modelValue = ref(this.value)
    watch(modelValue, this.onChangeFilter)

    return {
      modelValue,
      gcSelectors,
      i18n: window.chrome.i18n
    }
  }

  get labelClass(): string {
    return cleanSelector(gcSelectors.filterLabel)
  }

  onChangeFilter(value: string): void {
    Logger.log('LobbyNameFilter', value)
    AnalyticsManager.sendEvent({
      ...analyticsEvents.FILTER_BY_LOBBY_PLAYER_NAME,
      value
    })
    lobbyFilter.filter.call(lobbyFilter, { playerName: value })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @use "sass:color";

  .gcc-lobby-name-filter {
    width: 100%;

    &__input {
      border-radius: 5px;
      background-color: #212335;
      border: 1px solid hsla(0,0%,100%,.04);
      color: hsla(0,0%,100%,.8);
      transition: background-color 0.2s ease-in-out;

      &:focus {
        box-shadow: 1px 0px 6px 0px #243a4e;
        background: white;
        color: black;
      }
    }
  }


</style>
