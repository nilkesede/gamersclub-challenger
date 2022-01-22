<template>
  <div class="gcc-stats-wrapper" >
    <div class="gcc-stats-bg" :style="userBackground"></div>

    <i v-if="isLoading" class="fas fa-spinner rotating gcc-stats__loading-icon" :class="{
      'gcc-stats__loading-icon--big-loading': isLoading,
      'gcc-stats__loading-icon--small-loading': isStillLoading
    }"></i>
    <span class="gcc-stats-player-id">GC ID: {{ playerId }}</span>

    <article v-if="!isLoading && stats">
      <section class="gcc-stats__profile">
        <div v-if="stats.initial && stats.initial.playerInfo" class="gcc-stats__profile-content">
          <div class="gcc-stats__core-info">
            <div class="gcc-stats__avatar-wrapper">
              <div class="gcc-stats__avatar" :style="{
                'background-image': `url(https://static.gamersclub.com.br/players/avatar/${playerId}/${playerId}_full.jpg)`,
              }"></div>
            </div>
            <div class="gcc-stats__core-general-info">
              <a :href="gcUrls.player(playerId)" target="blank">
                <h4 class="gcc-stats__profile-name">
                  {{ stats.initial.playerInfo.nick }}
                </h4>
              </a>
              <!-- <small class="gcc-stats__profile-rating">{{ stats.initial.playerInfo.rating }}</small> -->
            </div>

          </div>

          <div class="gcc-stats__profile-social-medias">
            <a v-for="social in socialButtons" :key="social.icon" :href="social.url" class="gcc-stats__profile-social-media-buttom" target="blank">
              <i :class="['fa', social.icon]"></i>
              {{ social.name }}
            </a>
          </div>
        </div>
      </section>
      <section class="gcc-stats__profile-stats">
        <transition-group class="gcc-stats__profile-stats-list" tag="ul">
          <li v-for="stat in availableUserStats" :key="stat.name" class="gcc-stats__profile-stat">
            <span class="gcc-stats__profile-stat-name">
              <i :class="[stat.icon]"></i> {{ stat.name }}
            </span>
            <p class="gcc-stats__profile-stat-value">{{ stat.value }}</p>
            <span v-if="stat.average" class="gcc-stats__profile-stat-average">{{i18n.getMessage('playerStats__averagePerMatch', stat.average.toFixed(1))  }}</span>
          </li>
        </transition-group>
      </section>
      <section v-if="historyMatchesNumbers.matches"
        class="gcc-stats__matches-section">
        <div class="gcc-stats__matches-numbers">
          <span class="gcc-stats__match-number gcc-stats__match-number--win">
            {{ i18n.getMessage('playerStats__wonMatches') }}: <strong>{{historyMatchesNumbers.wins }}</strong>
          </span>
          <span class="gcc-stats__match-number gcc-stats__match-number--total"> {{ i18n.getMessage('playerStats__totalMatches') }}: {{ historyMatchesNumbers.matches }}</span>
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
import { Options, Vue } from 'vue-class-component'
import { GCInitialPlayerStats } from '../scripts/lobby/domain/GCInitialPlayerStats'
import { gcUrls } from '../utils/gcUrls'
import { GCPlayerStatsHistory } from '@/scripts/lobby/domain/GCPlayerStatsHistory'
import VueSlider from 'vue-slider-component'
import analytics from '@/utils/analytics'
import Logger from 'js-logger'
import $ from 'jquery'
import { gcSelectors } from '@/utils/gcSelectors'
import { socialMedia } from '../scripts/lobby/domain/socialMedia'

const totalStatsMap = {
  firstKills: { name: "First kills", icon: 'fa fa-stopwatch' },
  clutches: { name: "Clutches", icon: 'fas fa-brain' },
  multiKills: { name: "Multi Kills", icon: 'fas fa-crosshairs' }
};

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
  isLoadingPlayer = true
  stats: Partial<{
    core: Partial<{
      social: Record<socialMedia, Partial<{ url?: string, name: string, icon: string }>>
      statistics: Partial<{ name: string, icon: string, value?: string, average?: number }>[]
    }>,
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
        instagram: { name: 'Insta', icon: 'fa-instagram'}
      },
      statistics: [
        { name: "KDR", icon: 'fas fa-skull-crossbones' },
        { name: "ADR", icon: 'fas fa-burn' },
        { name: "HS%", icon: 'fas fa-skull' },
        totalStatsMap.firstKills,
        totalStatsMap.clutches,
        totalStatsMap.multiKills
      ]
    }
    return {
      i18n,
      gcUrls,
    }
  }

  beforeMount() {
    this.fetchPlayerStats()
  }

  mounted() {
    // @ts-ignore
    $(this.$el).tilt({
      glare: true,
      axis: 'x',
      maxTilt: 10,
      maxGlare: 0.1,
      scale: 1.1
    })
  }

  get isLoading() {
    return this.isLoadingInitialData && this.isLoadingHistory && this.isLoadingPlayer
  }

  get isStillLoading() {
    return this.isLoadingInitialData || this.isLoadingHistory || this.isLoadingPlayer
  }

  get historyMatchesNumbers() {
    return this.stats?.history?.matches || { matches: 0, loss: 0, wins: 0}
  }

  get userBackground() {
    const image = this.stats?.initial?.playerInfo?.statsBackground?.image
    return image ? {
      'background-image': `url(${image})`
    } : {
      'background-image': `url(${window.browser.runtime.getURL('../../assets/awesome-ct-bg.JPG')})`,
      'background-position': 'left center'
    }
  }

  get socialButtons() {
    return Object.values(this.stats.core?.social as any).filter((social: any) => social.url)
  }

  get availableUserStats() {
    const stats =  this.stats.core?.statistics || []
    const totalStatsNames = Object.values(totalStatsMap).map((item) => item.name)

    stats.map((stat) => {
      const historyStat = this.stats.history?.stat.find((currentHistoryStat) => currentHistoryStat.stat.toLowerCase() === stat.name?.toLowerCase())
      if(historyStat) {
        stat.value = historyStat.value
        const numberValue = parseInt(stat.value, 10)
        if(totalStatsNames.includes(stat.name as string) && numberValue && this.historyMatchesNumbers?.matches){
          stat.average = numberValue / this.historyMatchesNumbers.matches
        }
      }
    })
    return stats.filter((stat) => stat.value)
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
        this.isLoadingPlayer = false
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
  $wrapperWidth: 320px;
  .gcc-stats-wrapper {
    width: $wrapperWidth;
    height: $wrapperHeight;
    position: relative;
    background-size: cover;
    transform-style: preserve-3d;

    &:hover {
      z-index: 12;
    }

    article {
      > section {
        border-bottom: 1px solid rgba(0,0,0,0.5);
      }
    }
  }

  .gcc-stats-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    box-shadow: 0 0 0.1px 1px black;
    opacity: 0.7;
  }

  .gcc-stats__core-info {
    display: flex;
    justify-content: space-between;
    padding-top: 5px;

    &:nth-child(even) {
      flex-direction: row-reverse;
    }
  }

  .gcc-stats__core-general-info {
    width: 200px;
    text-align: left;
    transform: translateZ(20px);
  }

  .gcc-stats__avatar-wrapper {
    padding-left: 10px;
  }

  .gcc-stats__avatar {
    width: 70px;
    height: 70px;
    background-size: cover;
    border-radius: 5px;
  }

  .gcc-stats__loading-icon {
    &--big-loading {
      text-align: center;
      display: block;
      font-size: 50px;
      padding: math.div($wrapperHeight, 3) 0;
    }

    &--small-loading {
      font-size: 20px;
      position: absolute;
      top: 40px;
      left: calc(50% - 10px);
    }
  }

  .gcc-stats-player-id {
    font-family: sans-serif;
    font-size: 10px;
    position: absolute;
    right: 5px;
    bottom: 5px;
    opacity: 0.4;
    font-style: italic;
  }

  .gcc-stats__profile {
    text-align: center;
    padding: 10px;
    min-height: 120px;

    &-name {
      font-size: 18px;
      font-weight: 700;
      font-family: 'Poppins';
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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

        i {
          margin-right: 5px;
        }
      }
    }

    &-stats-list {
      display: flex;
      list-style: none;
      margin: 0;
      flex-wrap: wrap;
      width: $wrapperWidth;
    }

    &-stat {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      width: math.div($wrapperWidth, 3);
      height: 60px;
      border-right: 1px solid black;
      padding-top: 10px;

      &:nth-child(n + 4) {
        border-top: 1px solid black;
      }

    }

    &-stat-name {
      font-size: 10px;
      font-weight: 700;

      i {
        font-size: 10px;
        margin-right: 5px;
      }
    }

    &-stat-average {
      margin-top: -21px;
      font-size: 7px;
      transition: font-size 0.2s ease-in-out;

      &:hover {
        cursor: help;
        font-size: 10px;
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

    &--total {
      color: gray;
      transition: font-size 0.2s ease-in-out;

      &:hover {
        cursor: help;
        font-size: 12px;
      }
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
