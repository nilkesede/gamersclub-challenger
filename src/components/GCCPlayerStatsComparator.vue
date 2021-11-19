<template>
  <div class="gcc-stats-comparator-wrapper">
    <div v-for="playerId in playersIds" :key="playerId" class="gcc-stats-comparator-content">
      <GCPlayerStats :playerId="playerId" />
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
import { gcSelectors } from '@/utils/gcSelectors'
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

  data() {
    const { i18n } = window.browser;

    this.playersIds ||= []
    // this.playersIds.push(serializer.serializeLoggedPlayer().id!)

    return {
      i18n,
      gcUrls,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.gcc-stats-comparator {
  &-content {
    position: relative;
    display: inline-block;
  }
}
</style>
