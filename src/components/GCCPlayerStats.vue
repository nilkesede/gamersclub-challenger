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
            <a v-for="social in socialButtons" :key="social.icon" :href="social.url" class="gcc-stats__profile-social-media-buttom" :class="[`gcc-stats__profile-social-media-buttom--${social.name}`]" target="blank">
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
      <section
        v-if="mapsStats && mapsStats.length"
        class="gcc-stats__maps-stats">
        <div class="gcc-stats__maps-stats-header">{{ i18n.getMessage('playerStats__lastMatches') }}</div>
        <transition-group class="gcc-stats__maps-stats-list" tag="ul">
          <li v-for="mapStat in mapsStats" :key="mapStat.name" class="gcc-stats__map-stats-item" :class="{
            'gcc-stats__map-stats-item--winner': mapStat.wins > mapStat.loss,
            'gcc-stats__map-stats-item--loser': mapStat.wins < mapStat.loss
          }">
            <div class="gcc-stats__map-bg" :style="getCsgoMapImage(mapStat.name)"></div>
            <span class="gcc-stats__map-stats-item-name">
              {{ mapStat.name }}
              <p class="gcc-stats__map-stats-item-number gcc-stats__map-stats-item-number--total">
                {{ i18n.getMessage('playerStats__totalMatches') }}: {{ mapStat.matches }}
              </p>
            </span>
            <div v-if="mapStat.percentage" class="gcc-stats__map-stats-item-number-wrapper">
              <div class="gcc-stats__map-stats-item-number-wrapper-content gcc-stats__map-stats-item-number-wrapper-content--win">
                <div class="gcc-stats__map-stats-item-number-label gcc-stats__map-stats-item-number-label--win">{{ i18n.getMessage('playerStats__wonMatches') }}</div>
                <span class="gcc-stats__map-stats-item-number gcc-stats__map-stats-item-number--win">
                  {{ mapStat.wins }}
                  <p class="gcc-stats__map-stats-item-number--percentage">{{ mapStat.percentage.wins }}</p>
                </span>
              </div>
              <div class="gcc-stats__map-stats-item-number-wrapper-content gcc-stats__map-stats-item-number-wrapper-content--loss">
                <div class="gcc-stats__map-stats-item-number-label gcc-stats__map-stats-item-number-label--loss">{{ i18n.getMessage('playerStats__lostMatches') }}</div>
                <span class="gcc-stats__map-stats-item-number gcc-stats__map-stats-item-number--loss">
                  {{ mapStat.loss }}
                  <p class="gcc-stats__map-stats-item-number--percentage">{{ mapStat.percentage.loss }}</p>
                </span>
              </div>
            </div>
          </li>
        </transition-group>
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
import BrowserStorage from '@/utils/storage'
import { GCMonthMatch } from "../scripts/lobby/domain/GCMonthMatch"
import { percentage } from '../utils/magicNumbers'

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
  totalStatsMap = {
    firstKills: { name: "First kills", icon: 'fa fa-stopwatch' },
    clutches: { name: "Clutches", icon: 'fas fa-brain' },
    multiKills: { name: "Multi Kills", icon: 'fas fa-crosshairs' }
  };

  data() {
    const { i18n } = window.browser;
    this.stats.core = {
      social: {
        twitch: { name: 'Twitch', icon: 'fa-twitch'},
        twitter: { name: 'Twitter', icon: 'fa-twitter'},
        steam: { name: 'Steam', icon: 'fa-steam'},
        youtube: { name: 'Youtube', icon: 'fa-youtube'},
        instagram: { name: 'Insta', icon: 'fa-instagram'}
      },
      statistics: [
        { name: "KDR", icon: 'fas fa-skull-crossbones' },
        { name: "ADR", icon: 'fas fa-burn' },
        { name: "HS%", icon: 'fas fa-skull' },
        this.totalStatsMap.firstKills,
        this.totalStatsMap.clutches,
        this.totalStatsMap.multiKills
      ]
    }
    return {
      i18n,
      gcUrls,
      browser: window.browser
    }
  }

  beforeMount() {
    this.fetchPlayerStats()
  }

  mounted() {
    if(BrowserStorage.settings.options?.enable3DGCCardEffect) {
      // @ts-ignore
      $(this.$el).tilt({
        glare: true,
        disableAxis: 'x',
        maxTilt: 10,
        maxGlare: 0.1,
        scale: 1.1
      })
    }
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
      'background-image': `url(${window.browser.runtime.getURL('../../assets/logo_500.png')})`,
      'background-position': 'left center'
    }
  }

  getCsgoMapImage(mapName: string) {
    const url = window.browser.runtime.getURL(`../../assets/csgo_maps/${mapName}.png`)
    return {
      'background-image': `url(${url})`
    }
  }

  get socialButtons() {
    return Object.values(this.stats.core?.social as any).filter((social: any) => social.url)
  }

  get availableUserStats() {
    const stats =  this.stats.core?.statistics || []
    const totalStatsNames = Object.values(this.totalStatsMap).map((item) => item.name)

    stats.map((stat) => {
      const historyStat = this.stats.history?.stat.find((currentHistoryStat) => currentHistoryStat.stat?.toLowerCase() === stat.name?.toLowerCase())
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

  buildMapStats(csgoMap: string, list: GCMonthMatch[]){
    const stats = { name:csgoMap, matches: list.length, loss: 0, wins: 0, percentage: { loss: '0', wins: '0' } }
    list.forEach((match) => {
      match.win ? stats.wins++ : stats.loss++
    })

    stats.percentage.loss = percentage(stats.loss, stats.matches, 1)
    stats.percentage.wins = percentage(stats.wins, stats.matches, 1)

    return stats
  }

  get mapsStats() {
    if(this.stats.history?.monthMatches?.length){
      //@ts-ignore
      const groupedCsgoMaps = this.stats.history.monthMatches.groupByKey('map')
      Logger.debug('Maps Stats', groupedCsgoMaps)

      const mapsStats = []
      for(let csgoMap in groupedCsgoMaps){
        if(csgoMap !== 'undefined'){
          mapsStats.push(this.buildMapStats(csgoMap, groupedCsgoMaps[csgoMap]))
        }
      }

      const sortedMapsStats = mapsStats.sort((map1, map2) => {
        let result
        const loss1 = parseFloat(map1.percentage.loss)
        const loss2 = parseFloat(map2.percentage.loss)

        if(loss1 < loss2){
          result = -1
        } else if(loss1 > loss2) {
          result = 1
        } else {
          result = 0
        }

        return result
      })

      return sortedMapsStats
    }
    return []
  }

  fetchPlayerStats() {
    try {

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
    } catch (err: any) {
      analytics.sendError(err)
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @use "sass:color";
  @use "sass:math";
  @import '../styles/_variables.scss';

  $green: #95b300;
  $red: #eb2f2f;
  $wrapperHeight: 400px;
  $wrapperWidth: 350px;
  .gcc-stats-wrapper {
    width: $wrapperWidth;
    min-height: $wrapperHeight;
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
    justify-content: space-around;
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
        box-sizing: border-box;
        border-radius: 5px;

        &:hover {
          box-shadow: $socialButtonShadow;
          color: white;
        }

        &:visited {
          color: white;
        }

        &:active {
          color: white;
          box-shadow: none;
        }

        i {
          margin-right: 5px;
        }

        &--Twitch {
          &:hover {
            background-color: $twitchPurple;
          }
        }

        &--Youtube {
          &:hover {
            background-color: $youtubeRed;
          }
        }

        &--Steam {
          &:hover {
            background-color: $steamBlack;
          }
        }

        &--Insta {
          &:hover {
            background-image: $instagramGradient;
          }
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

  .gcc-stats__profile-stats-list {
    &-enter, &-leave-to {
      opacity: 0;
      transform: translateY(30px);
    }

    .gcc-stats__profile-stat {
      transition: all 0.4s;
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

  .gcc-stats__maps-stats-header {
    background: $steamBlack;
    width: 100%;
    color: white;
    text-align: center;
  }

  .gcc-stats__maps-stats-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    width: $wrapperWidth;
    background-color: rgba(#000, 0.4);
  }

  .gcc-stats__map-stats-item {
    display: flex;
    position: relative;
    flex-direction: row;
    background-color: rgba($orange, 0.5);
    width: math.div($wrapperWidth, 2);
    height: 50px;
    border-right: 1px solid black;
    justify-content: space-between;

    &:nth-child(n + 3) {
      border-top: 1px solid black;
    }

    &--winner {
      background-color: rgba($green, 0.5);

      .gcc-stats__map-stats-item-number-wrapper-content--loss {
        opacity: 0.5;
      }

      .gcc-stats__map-stats-item-number-wrapper-content--win {
        background-color: $green;
      }

      .gcc-stats__map-stats-item-number-wrapper:hover{
        .gcc-stats__map-stats-item-number-label--win {
          opacity: 1;
        }
      }
    }

    &--loser {
      background-color: rgba($red, 0.5);

      .gcc-stats__map-stats-item-number-wrapper-content--win {
        opacity: 0.5;
      }

      .gcc-stats__map-stats-item-number-wrapper-content--loss {
        background-color: $red;
      }

      .gcc-stats__map-stats-item-number-wrapper:hover {
        .gcc-stats__map-stats-item-number-label--loss {
          opacity: 1;
        }
      }
    }
  }

  .gcc-stats__map-bg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-position: center;
    background-size: cover;
    opacity: 0.7;
    z-index: 0;
  }

  .gcc-stats__map-stats-item-name {
    z-index: 1;
    padding: 5px;
    font-weight: 600;
    text-shadow:
    0px 0px 0 #000,
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;

    .gcc-stats__map-stats-item-number--total {
      font-weight: 300;
    }
  }

  .gcc-stats__map-stats-item-number-wrapper {
    display: flex;
    flex-direction: row;
    text-align: center;
    z-index: 1;
    text-shadow:
    3px 3px 0 #000,
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;

    .gcc-stats__map-stats-item-number-wrapper-content {
      width: 35px;
      padding: 5px;
      position: relative;
    }

    .gcc-stats__map-stats-item-number {
      font-weight: 600;
      font-size: 18px;
    }
  }

  .gcc-stats__map-stats-item-number-label {
    position: absolute;
    background: $steamBlack;
    font-size: 10px;
    stroke: none;
    text-shadow: none;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    padding: 5px;
    z-index: 1;

    &--win {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      left: -47px;
      bottom: 5px;
    }

    &--loss {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      right: -54px;
      bottom: 5px;
      z-index: 2;
    }
  }

  .gcc-stats__map-stats-item-number {
    transition: font-size 0.2s ease-in-out;
    font-size: 10px;

    &--percentage {
      text-shadow:
        0px 0px 0 #000,
        -1px -1px 0 #000,
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000;
      font-size: 8px;
      font-weight: 400;
    }
  }
</style>
