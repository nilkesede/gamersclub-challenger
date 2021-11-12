<template>
  <div class="gcc-stats-wrapper" :style="{
    'background-image': backgroundImage
  }">
    <i v-if="isLoading" class="fas fa-spinner rotating"></i>
    <article v-if="!isLoading && stats">
      <section v-if="stats.initial && stats.initial.playerInfo" class="gcc-stats__profile">
        <h4 class="gcc-stats__profile-name">
          {{ stats.initial.playerInfo.nick }}
        </h4>
        <small class="gcc-stats__profile-rating">{{ stats.initial.playerInfo.rating }}</small>
      </section>
      <section v-if="historyMatchesNumbers"
        class="gcc-stats__matches">
        <div class="gcc-stats__matches-numbers">
          <span class="gcc-stats__match-number gcc-stats__match-number--win">
            {{ i18n.getMessage('playerStats__wonMatches') }}: <strong>{{historyMatchesNumbers.wins }}</strong>
          </span>
          <span class="gcc-stats__match-number gcc-stats__match-number--loss">
            {{ i18n.getMessage('playerStats__lostMatches') }}: <strong>{{historyMatchesNumbers.loss }}</strong>
          </span>
        </div>
        <div class="gcc-stats__matches-slider-wrapper">
          <vue-slider v-model="historyMatchesNumbers.wins"
            :interval="1"
            :marks="[]"
            :min="0"
            :max="historyMatchesNumbers.matches"
            tooltip="none"
            :disabled="true"
            :railStyle="{ 'background-color': '#eb2f2f' }"
            :processStyle="{ 'background-color': '#95b300' }"
            ></vue-slider>
        </div>
        <div class="gcc-stats__matches-numbers">
          <span class="gcc-stats__match-number gcc-stats__match-number--win">
            {{ ((historyMatchesNumbers.wins * 100) /  historyMatchesNumbers.matches).toFixed(1) }}%
          </span>
          <span class="gcc-stats__match-number gcc-stats__match-number--loss">
            {{ ((historyMatchesNumbers.loss * 100) /  historyMatchesNumbers.matches).toFixed(1) }}%
          </span>
        </div>
      </section>
    </article>
    <p v-if="!isLoading && !stats">ERROR</p>
  </div>
</template>

<script lang="ts">
import Component, { Options, Vue } from 'vue-class-component'
import { ref, Ref } from 'vue'
import { GCInitialPlayerStats } from '../scripts/lobby/domain/GCInitialPlayerStats'
import { gcUrls } from '../utils/gcUrls'
import { GCPlayerStatsHistory } from '@/scripts/lobby/domain/GCPlayerStatsHistory'
import VueSlider from 'vue-slider-component'

@Options({
  components: {
    VueSlider,
  },

  props: {
    value: Number,
    playerId: String,
    tippyInstance: Object,
  }
})
export default class GCCStats extends Vue {
  playerId!: string
  tippyInstance!: any
  isLoadingInitialData = true
  isLoadingHistory = true
  stats: Partial<{
    initial: GCInitialPlayerStats,
    history: GCPlayerStatsHistory
  }> = {}

  data() {
    const { i18n } = window.browser;
    return {
      i18n
    }
  }

  mounted() {
    this.fetchPlayerStats()
  }

  get isLoading() {
    return this.isLoadingInitialData && this.isLoadingHistory
  }

  get historyMatchesNumbers() {
    return this.stats?.history?.matches || {}
  }

  get backgroundImage() {
    const image = this.stats?.initial?.playerInfo?.statsBackground?.image
    return image ? `url(${image})` : ''
  }

  fetchPlayerStats() {
    var headers = new Headers();
    // headers.set('accept-language', 'es')

    fetch(gcUrls.boxInitialMatches(this.playerId))
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.stats.initial = data
        this.isLoadingInitialData = false
      })
      .catch((err) => { console.log('errooou boxInitialMatches', err) })

    fetch(gcUrls.boxMatchesHistory(this.playerId))
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.stats.history = data
        this.isLoadingHistory = false
      })
      .catch((err) => { console.log('errooou boxMatchesHistory', err) })
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @use "sass:color";
  $green: #95b300;
  $red: #eb2f2f;

  .gcc-stats-wrapper {
    width: 320px;
    height: 400px;
    position: relative;
    padding: 5px 10px;
    background-size: cover;
  }

  .gcc-stats__profile {
    text-align: center;

    &-name {
      font-size: 18px;
      font-weight: 700;
    }

    &-rating {
      font-size: 10px;
      font-weight: 100;
    }
  }

  .gcc-stats__matches {
    display: flex;
    flex-direction: column;
  }

  .gcc-stats__matches-numbers {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .gcc-stats__match-number {
    font-size: 8px;
    font-weight: 100;

    strong {
      font-size: 14px;
    }

    &--win {
      color: $green;
    }

    &--loss {
      color: $red;
    }
  }

  .gcc-stats__matches-slider-wrapper {
    flex: 1;

    .vue-slider-rail {
      background-color: $red;
    }

    .vue-slider-process {
      background-color: $green;
    }
  }
</style>
