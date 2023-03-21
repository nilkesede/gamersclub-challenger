<template>
  <div class="gcc-stats-comparator">
    <button
      v-if="compare.playersIds && compare.playersIds.length === 1 && compare.playersIds[compare.playersIds.length - 1] !== loggedPlayer.id"
      type="button"
      class="gcc-stats-comparator__comparate-button" @click="comparateUser">
      <span>VS</span>
    </button>
    <div class="gcc-stats-comparator__content">
      <div v-for="(playerId, $index) in compare.playersIds" :key="playerId" class="gcc-stats-comparator__comparable-wrapper">
        <div class="gcc-stats-comparator__comparable-separator" v-if="$index != 0">
          <div class="gcc-stats-comparator__comparable-separator-content">
            <span>VS</span>
          </div>
        </div>
        <GCPlayerStats :playerId="playerId" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { gcUrls } from '../utils/gcUrls'
import VueSlider from 'vue-slider-component'
import analytics from '@/utils/analytics'
import Logger from 'js-logger'
import $ from 'jquery'
import { gcSelectors } from '@/utils/gc/selectors'
import GCPlayerStats from './GCCPlayerStats.vue'
import serializer from '@/scripts/lobby/serializer'

@Options({
  components: {
    VueSlider,
    GCPlayerStats,
  },

  props: {
    playersIds: Array,
  }
})
export default class GCCStatsPlayerComparator extends Vue {
  playersIds!: string[]
  compare: { playersIds: string[] } = { playersIds: [] }

  data() {
    const { i18n } = window.browser
    this.compare.playersIds = this.compare.playersIds.concat(this.playersIds)
    Logger.debug('compare.playersIds', this.compare.playersIds)

    return {
      i18n,
      gcUrls,
      loggedPlayer: serializer.serializeLoggedPlayer()
    }
  }

  comparateUser() {
    const { id } = serializer.serializeLoggedPlayer()
    if(id) {
      this.compare.playersIds.push(id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @use "sass:math";
  $blue: #247eb9;
  $darkenBlue: #1e6a9b;
  $gray: #484848;

  :deep .gcc-stats-comparator {
    &__comparable-wrapper:last-child {
      .gcc-stats__core-info {
        flex-direction: row-reverse;
      }

      .gcc-stats__core-general-info {
        text-align: right;
      }
    }
  }

  .gcc-stats-comparator {
    position: relative;

    &:hover {
      .gcc-stats-comparator__comparate-button {
        opacity: 1;
      }
    }

    &__content {
      display: flex;
    }

    &__comparate-button {
      position: absolute;
      right: -80px;
      top: 0;
      bottom: 0;
      border: 1px dashed $blue;
      color: white;
      transition: background-color 0.2s ease-in-out, opacity 0.2s ease-in-out;
      z-index: 10;
      opacity: 0;
      background-color: rgba($color: $blue, $alpha: 0.5);

      &:hover {
        background: $darkenBlue;
      }

      &:disabled {
        background: $gray;
        cursor: not-allowed;
        opacity: 0.7;
      }
    }

    &__comparable-wrapper {
      position: relative;
    }

    &__comparable-separator {
      width: 15px;
      height: 100%;
      display: flex;
      position: absolute;
      top: 0;
      left: -10px;
      bottom: 0;
      z-index: 10;
    }

    &__comparable-separator-content {
        $size: 40px;
        z-index: 11;
        text-align: center;
        border-radius: 20px;
        width: $size;
        height: $size;
        background-color: black;
        border: 2px solid black;
        color: white;
        vertical-align: middle;
        position: absolute;
        left: -10px;
        top: calc(50% - #{math.div($size, 2) + 3px});
        padding: 10px 0;
    }

  }
</style>
