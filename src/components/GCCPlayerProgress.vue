<template>
  <div class="gcc-player-progress-content">
    <i
      v-if="isLoading"
      class="fas fa-spinner rotating gcc-player-progress__loading-icon gcc-player-progress--big-loading"
    ></i>
    <vue-slider
      v-if="stats && stats.playerInfo && gcLevel && lastMatch"
      v-model="sliderValues"
      :interval="1"
      :marks="[
        previousGCLevel.maxRating,
        nextGCLevel.minRating
      ]"
      :min="gcLevel.minRating"
      :max="gcLevel.maxRating"
      :disabled="true"
      :dot-options="dotOptions"
      :tooltipPlacement="tooltipPlacements"
      :dotStyle="dotStyle"
      :processStyle="{
        'background-color': gcLevel.color
      }"
    >
      <template v-slot:dot="{ value }" >
        <span v-if="value === lastMatch.ratingPlayer && showStreak && streakNumber"
          class="streak-emoji"
          @mouseleave="showStreak = false"
          :title="streakTitle"
        >
          {{lastMatchEmoji}}
        </span>
        <span v-if="value === lastMatch.ratingPlayer && !showStreak && streakNumber"
          @mouseenter="discoverStreak">
          <GCCLogo />
        </span>
        <span v-if="value !== lastMatch.ratingPlayer && value !== gcLevel.minRating"></span>
        <span v-if="value === gcLevel.minRating"><!-- Fake dot --></span>
      </template>
      <template v-slot:mark="{ value }">
        <div v-if="value === previousGCLevel.maxRating"
          class="custom-mark custom-mark--min"
          :style="{ left: `0%` }"
          >
          <GCCPlayerLevel
            v-if="gcLevel.level > 0"
            :level="gcLevel.level"
            :is-gamersclub-subscriber="stats.playerInfo.isSubscriber"
            :title="gcLevel.minRating" />
          <div v-if="pointsToLevelDowngrade" class="gcc-diff-level-rating-points gcc-diff-level-rating-points--to-downgrade"
            :title="i18n.getMessage('playerProgress__diffPointsToDowngrage', previousGCLevel.level.toString())"
          >
            <span>{{ pointsToLevelDowngrade }}</span>
          </div>
        </div>
        <div v-if="value === nextGCLevel.minRating"
          class="custom-mark"
          :style="{ left: `100%` }">
          <GCCPlayerLevel
            v-if="gcLevel.level < 21"
            :level="nextGCLevel.level"
            :is-gamersclub-subscriber="stats.playerInfo.isSubscriber"
            :title="nextGCLevel.minRating" />
          <div class="gcc-diff-level-rating-points gcc-diff-level-rating-points--to-upgrade"
            :title="i18n.getMessage('playerProgress__diffPointsToUpgrade', nextGCLevel.level.toString())">
            <span>{{ pointsToLevelUpgrade }}</span>
          </div>
        </div>
      </template>
      <template v-slot:tooltip="{ value, index }">
        <div v-if="value === stats.playerInfo.rating && index === 2" class="custom-tooltip gcc-player-rating">
          <span class="gcc-player-rating__value" :title="i18n.getMessage('playerProgress__currentRating')">{{ value }}</span>
        </div>
        <div v-if="lastMatch && index === 1"
          class="custom-tooltip"
          :title="ratingDiffTitle"
        >
          <a :href="gcUrls.match(lastMatch.id)"
            class="rating-diff"
            :class="{
              'rating-diff--win': lastMatch.ratingDiff > 0,
              'rating-diff--draw': lastMatch.ratingDiff === 0,
              'rating-diff--loss': lastMatch.ratingDiff < 0,
            }">
            <span v-if="lastMatch.ratingDiff > 0" class="rating-diff__win-prefix">+</span>
            <span>{{lastMatch.ratingDiff}}</span>
          </a>
        </div>
      </template>
    </vue-slider>

  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { gcLevelsMap } from '@/shared/gc/levels'
import analytics from "@/shared/analytics";
import { userAPI } from "@/shared/gc/api";
import VueSlider from "vue-slider-component";
import GCCPlayerLevel from './GCCPlayerLevel.vue'
import GCCLogo from './GCCLogo.vue'
import { getWinStreakEmoji, getLossStreakEmoji, calcStreakNumber } from '@/shared/emojis/streak'
import { staticEvents } from "@/shared/analytics/events";
import { gcUrls } from "@/shared/gc/api/resources/urls";
import { getCleanMapName } from "@/shared/StringUtils";

const GCCPlayerProgressComponent = defineComponent({
  components: {
    VueSlider,
    GCCPlayerLevel,
    GCCLogo,
  },
  props: {
    playerId: {
      type: String,
      required: true
    },

    initialStats: {
      type: Object,
      required: false
    }
  },

  setup(props) {
    return {
      i18n: window.browser.i18n,
      rating: ref(0),
      stats: ref(props.initialStats),
      isLoading: ref(false),
      showStreak: ref(false),
      gcUrls,
      dotOptions: [
        {
          tooltip: 'none',
        },
        {
          tooltip: 'always',
        },
        {
          tooltip: 'always',
        },
      ],
      tooltipPlacements: [
        'bottom',
        'top',
        'bottom',
      ]
    };
  },

  created(){
    if(!this.initialStats){
      this.isLoading = true
      userAPI.boxInitialMatches(this.playerId).then((data) => {
        this.stats = data
      }).finally(() => {
        this.isLoading = false
      });
    }
  },

  computed: {

    gcLevel() {
      if(this.stats){
        return gcLevelsMap[this.stats.playerInfo.level]
      }
      return null
    },

    previousGCLevel(){
      if(this.stats){
        const previousLevel = this.gcLevel.level === 0 ? this.gcLevel.level : this.gcLevel.level - 1
        return gcLevelsMap[previousLevel]
      }
      return null
    },

    nextGCLevel(){
      if(this.stats){
        const nextLevel = this.gcLevel.level === 0 ? this.gcLevel.level : this.gcLevel.level + 1
        return gcLevelsMap[nextLevel]
      }
      return null
    },

    lastMatch(){
      if(this.stats){
        const last = this.stats.lastMatches[this.stats.lastMatches.length - 1]
        return last
      }
      return null
    },

    streakNumber(){
      let streak = 0
      if(this.lastMatch){
        const lastMatchWinValue = this.lastMatch.win
        const reversedMatches = this.stats.lastMatches.map((match) => match.win).reverse()
        streak = calcStreakNumber(lastMatchWinValue, reversedMatches)
      }

      return streak
    },

    streakTitle(){
      let title = ''
      if(this.lastMatch){
        title = this.lastMatch.win ? this.i18n.getMessage('playerProgress__winStreak', this.streakNumber.toString()) : this.i18n.getMessage('playerProgress__lossStreak', this.streakNumber.toString())
      }
      return title
    },

    lastMatchEmoji(){
      let emoji = '❔'
      if(this.lastMatch){
        const lastMatchWinValue = this.lastMatch.win
        emoji = lastMatchWinValue ? getWinStreakEmoji(this.streakNumber) : getLossStreakEmoji(this.streakNumber)
      }

      return emoji
    },

    marks(){
      if(this.stats){
        const marks = {}
        marks[this.previousGCLevel.level] = {}
        marks[this.nextGCLevel.level] = {}
        return
      }

      return []
    },

    dotStyle(){
      return {
        'width': '25px',
        'height': '25px',
        'transform': 'translate(-50%, -50%)',
        'top': '50%',
        'transition': 'left 0.5s ease 0s',
      }
    },

    kdrValue(){
      if(this.stats){
        const kdr = this.stats.find((stat) => stat.stat.toUpperCase() === 'KDR')
        return kdr !== undefined ? parseInt(kdr) : null
      }
      return null
    },

    ratingBeforeLastMatch(){
      if(this.lastMatch){
        return this.lastMatch.ratingPlayer - this.lastMatch.ratingDiff
      }
      return null
    },

    pointsToLevelDowngrade(){
      let points = 0
      if(this.stats){
        points = this.stats.playerInfo.rating - this.previousGCLevel.maxRating
      }
      return points
    },

    pointsToLevelUpgrade(){
      let points = 0
      if(this.stats){
        points = this.nextGCLevel.minRating - this.stats.playerInfo.rating
      }
      return points
    },

    ratingDiffTitle(){
      let titleMessage = ''
      if(this.lastMatch){
        if(this.lastMatch.ratingDiff > 0) {
          titleMessage = this.i18n.getMessage('playerProgress__lastMatchWinPoints')
        } else if (this.lastMatch.ratingDiff < 0) {
          titleMessage = this.i18n.getMessage('playerProgress__lastMatchLostPoints')
        } else {
          titleMessage = this.i18n.getMessage('playerProgress__lastMatchWithoutPoints')
        }

        titleMessage += ` (${getCleanMapName(this.lastMatch.map).toUpperCase()} ${this.lastMatch.scoreA}x${this.lastMatch.scoreB})`
      }
      return titleMessage
    },

    sliderValues(){
      if(this.stats){
        const values = [this.gcLevel.minRating]
        if(this.lastMatch){
          values.push(this.ratingBeforeLastMatch)
          values.push(this.lastMatch.ratingPlayer)
        }
        return values
      }

      return []
    },
  },

  methods: {
    discoverStreak() {
      this.showStreak = true
      analytics.sendEvent({ ...staticEvents.DISCOVER_PROGRESS_STREAK, value: this.streakNumber })
    }
  }
});

export default GCCPlayerProgressComponent
</script>

<style lang="scss">
@use "sass:color";
@import "../styles/_variables.scss";

.gcc-player-progress__loading-icon {
  &--big-loading {
    text-align: center;
    display: block;
    font-size: 50px;
    padding-top: 20px;
  }

}

.gcc-player-progress-content {
  width: 200px;
  z-index: 99999;
  display: block;
  position: fixed;
  right: 100px;
  padding-top: 20px;
  text-align: center;
  height: 64px;

  .gcc-player-level-badge {
    display: inline-block;
  }

  .vue-slider {
    &.vue-slider-disabled {
      opacity: 1;
    }
  }

  .vue-slider-dot {
    width: 25px !important;
    height: 25px !important;
    top: 3px !important;
    cursor: help;
  }

  .vue-slider-dot-tooltip-top {
    top: 5px !important;
  }

  .vue-slider-dot-tooltip-bottom {
    bottom: 5px !important;
  }

  .gcc-kdr-wrapper {
    width: 50px;
    position: absolute !important;
    bottom: -94px;
    right: 5px;
  }

  .rating-diff {
    font-family: Poppins, sans-serif;

    &--win {
      color: $green;
      &:hover {
        text-shadow: 0 0 16px $green;
      }
    }

    &--draw {
      color: $yellow;
      &:hover {
        text-shadow: 0 0 16px $yellow;
      }
    }

    &--loss {
      color: $red;
      &:hover {
        text-shadow: 0 0 16px $red;
      }
    }
  }

  .custom-tooltip {
    font-weight: bold;
  }

  .streak-emoji {
    text-shadow: 0px 0px 5px #000;
    font-size: 18px;
    cursor: default;
  }

  .gcc-diff-level-rating-points {
    font-size: 12px;
    font-weight: bold;
    padding: 0px 4px;
    cursor: help;

    &--to-downgrade {
      color: $red;
    }

    &--to-upgrade {
      color: $green;
    }
  }
}


.custom-mark {
  position: absolute;
  top: -10px;
  white-space: nowrap;
  cursor: help;

  &--min {
    transform: translateX(-100%);
  }
}
</style>
