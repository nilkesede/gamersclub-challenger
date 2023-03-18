<template>
  <div class="gcc-filters-bar">
    <header>
      <h2 class="gcc-filters-bar__title">
        <GCCLogo />
        <span>GamersClub Challenger</span>
      </h2>
      <hr class="gcc-filter-bar__hearder-divider" />
    </header>
    <LobbyNameFilter v-if="isNameFilterEnabled" />
    <article class="gcc-filters-bar-content">
      <section v-if="isKDRFilterEnabled" class="gcc-filters-bar__filter-section gcc-filters-bar__filter-section--min-height" style="flex: 0.2">
        <KDRFilter :value="initialKDRFilterValue" />
      </section>
    </article>
  </div>
</template>

<script lang="ts">
import { Ref, ref, watch, defineComponent } from 'vue'
import { gcSelectors } from '../utils/gcSelectors'
import { cleanSelector } from '@/utils/StringUtils'
import serializer from '@/scripts/lobby/serializer'
import $ from 'jquery'
import Logger from 'js-logger'
import Analytics from '@/utils/analytics'
import { staticEvents } from '@/utils/analytics/events'
import KDRFilter from './KDRFilter.vue'
import LobbyNameFilter from './LobbyNameFilter.vue'
import GCCLogo from './GCCLogo.vue'
import BrowserStorage from '@/utils/storage'
import lobbyFilter from '@/scripts/lobby/lobbyFilter'

export default defineComponent({
  components: {
    KDRFilter,
    LobbyNameFilter,
    GCCLogo
  },

  setup(){
    return {
      initialKDRFilterValue: lobbyFilter.filters.kdr || BrowserStorage.defaultSettings.filters?.kdr
    }
  },

  computed: {
    isNameFilterEnabled(){
      return BrowserStorage.settings.options?.enableNameFilter
    },

    isKDRFilterEnabled(){
      return BrowserStorage.settings.options?.enableKDRFilter
    }
  }
})

</script>

<style lang="scss">
@import "../styles/_variables.scss";

$headerBorderColor: rgba(255, 255, 255, 0.24);

.gcc-filters-bar {
  padding: 0 1rem 1rem 1rem;

  header {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    justify-content: space-between;

    .gcc-filter-bar__hearder-divider {
      flex: 1;
      border: 1px dashed $headerBorderColor;
    }
  }

  &__title {
    display: flex;
    align-items: center;
    font-weight: 600;
    background: linear-gradient(0deg,#212435 30%,#212435,#212435);
    padding: 0.5rem 1rem;
    color: #fff;
    margin-bottom: 1rem;
    text-transform: uppercase;
    border: 0.01px dashed $headerBorderColor;
    border-radius: 2px;
    font-size: 14px;
    gap: 8px;
    transition: all 0.2s ease-in-out;

    &:hover {
      background: white;
      border-color: black;
      color: black;
      box-shadow: 0 0 10px 1px #1e6a9b;
    }
  }
}

.gcc-filters-bar-content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  gap: 16px;

  .gcc-filters-bar__filter-section {
    padding: 16px;
    background-color: rgba(255, 255, 255, 0.04);
    border-radius: 2px;
    backdrop-filter: blur(16px);
    min-width: 130px;

    &--min-height {
      min-height: 126px;
    }
  }
}
</style>