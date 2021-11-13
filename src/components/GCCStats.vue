<template>
  <div class="gcc-stats-wrapper" >
    <div class="gcc-stats-bg" :style="{
    'background-image': backgroundImage
      }"></div>
    <i v-if="isLoading" class="fas fa-spinner rotating gcc-stats__loading-icon"></i>
    <article v-if="!isLoading && stats">
      <section v-if="stats.initial && stats.initial.playerInfo" class="gcc-stats__profile">
        <h4 class="gcc-stats__profile-name">
          {{ stats.initial.playerInfo.nick }}
        </h4>
        <small class="gcc-stats__profile-rating">{{ stats.initial.playerInfo.rating }}</small>
        <div class="gcc-stats__profile-social-medias">
          <a v-for="social in socialButtons" :key="social.icon" :href="social.url" class="gcc-stats__profile-social-media-buttom">
            <i :class="['fa', social.icon]"></i>
            {{ social.name }}
          </a>
        </div>
      </section>
      <section v-if="historyMatchesNumbers"
        class="gcc-stats__matches-section">
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
import analytics from '@/utils/analytics'
import Logger from 'js-logger'
import $ from 'jquery'
import { gcSelectors } from '@/utils/gcSelectors'

type socialMedia = 'steam' | 'twitter' | 'twitch' | 'instagram'

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
    core: {
      social: Record<socialMedia, Partial<{ url?: string, name: string, icon: string }>>
    },
    initial: GCInitialPlayerStats,
    history: GCPlayerStatsHistory
  }> = {}

  data() {
    const { i18n } = window.browser;
    this.stats.core = {
      social: {
        twitch: { name: 'Twitch', icon: 'fa-twitch'},
        twitter: { name: 'Twitter', icon: 'fa-twitter'},
        steam: { name: 'Steam', icon: 'fa-steam'},
        instagram: { name: 'Instagram', icon: 'fa-instagram'}
      }
    }
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
    return image ? `url(${image})` : `url('../../assets/awesome-ct-bg.jpg')`
  }

  get socialButtons() {
    return Object.values(this.stats.core?.social as any).filter((social: any) => social.url)
  }

  fetchPlayerStats() {

    fetch(gcUrls.player(this.playerId))
    .then(response => response.text())
      .then(data => {
        const $page = $(data)
        Logger.debug('player data length', $page.length)

        const socialKeys = Object.keys(this.stats.core?.social as any)
        socialKeys.forEach((socialKey) => {
          const social = this.stats.core?.social?.[socialKey as socialMedia]
          const selector = gcSelectors.playerPage.socialButtons[socialKey as socialMedia]
          if(social && selector){
            social.url =  $page.find(selector).attr('href') || ''
          }
        })
      })
      .catch(analytics.sendError)

    fetch(gcUrls.boxInitialMatches(this.playerId))
      .then(response => response.json())
      .then(data => {
        Logger.debug('boxInitialMatches', data)
        this.stats.initial = data
        this.isLoadingInitialData = false
      })
      .catch(analytics.sendError)

    fetch(gcUrls.boxMatchesHistory(this.playerId))
      .then(response => response.json())
      .then(data => {
        Logger.debug('boxMatchesHistory', data)
        this.stats.history = data
        this.isLoadingHistory = false
      })
      .catch(analytics.sendError)
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @use "sass:color";
  @use "sass:math";

  $green: #95b300;
  $red: #eb2f2f;
  $wrapperHeight: 400px;

  .gcc-stats-wrapper {
    width: 320px;
    height: $wrapperHeight;
    position: relative;
    background-size: cover;

    article > section {
      border-bottom: 1px solid rgba(0,0,0,0.5);
    }
  }

  .gcc-stats-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

  .gcc-stats__loading-icon {
    text-align: center;
    display: block;
    font-size: 50px;
    padding: math.div($wrapperHeight, 3) 0;
  }

  .gcc-stats__profile {
    text-align: center;
    padding: 10px;
    min-height: 120px;

    &-name {
      font-size: 18px;
      font-weight: 700;
    }

    &-rating {
      font-size: 10px;
      font-weight: 100;
    }

    &-social-medias {
      margin: 0;
      list-style: none;
      display: flex;
      padding-top: 15px;

      .gcc-stats__profile-social-media-buttom {
        flex: 1;
        font-size: 12px;
        padding: 5px;
      }
    }
  }

  .gcc-stats__matches-section {
    display: flex;
    flex-direction: column;
    padding: 10px 40px;
  }

  .gcc-stats__matches-numbers {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .gcc-stats__match-number {
    font-size: 8px;
    font-weight: 700;

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
