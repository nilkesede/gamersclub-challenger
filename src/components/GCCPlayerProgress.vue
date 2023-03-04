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
        previousGCLevel.minRating,
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
      <template v-slot:dot="{ value }">
        <GCCPlayerLevel v-if="value === lastMatch.ratingPlayer" :level="gcLevel.level" :class="['custom-dot', { focus }]" />
        <span v-if="lastMatch.ratingPlayer > 0 && value !== lastMatch.ratingPlayer && value !== gcLevel.minRating">🔥</span>
        <span v-if="lastMatch.ratingPlayer < 0 && value !== lastMatch.ratingPlayer && value !== gcLevel.minRating">😔</span>
        <span v-if="value === gcLevel.minRating"></span>
      </template>
      <template v-slot:mark="{ value }">
        <div v-if="value === previousGCLevel.minRating" class="custom-mark custom-mark--min" :style="{ left: `0%` }">
          <GCCPlayerLevel v-if="gcLevel.level > 0" :level="previousGCLevel.level" :title="previousGCLevel.minRating" />
          <!-- {{previousGCLevel.minRating}} -->
        </div>
        <div v-if="value === nextGCLevel.minRating" class="custom-mark" :style="{ left: `100%` }">
          <GCCPlayerLevel v-if="gcLevel.level < 21" :level="nextGCLevel.level" :title="nextGCLevel.minRating" />
          <!-- {{nextGCLevel.minRating}} -->
        </div>
      </template>
      <template v-slot:tooltip="{ value }">
        <div v-if="value !== ratingBeforeLastMatch" class="custom-tooltip">{{ value }}</div>
        <div v-if="value === ratingBeforeLastMatch" class="custom-tooltip rating-diff" :class="{
          'rating-diff--win': lastMatch.ratingDiff > 0,
          'rating-diff--draw': lastMatch.ratingDiff === 0,
          'rating-diff--loss': lastMatch.ratingDiff < 0,
        }">{{lastMatch.ratingDiff}}</div>
      </template>
    </vue-slider>
    <KDR v-if="stats" :value="1.23" :playerId="playerId" />

  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { gcLevelsMap } from '../utils/gc/levels'
import { userAPI } from "../utils/gcAPI";
import VueSlider from "vue-slider-component";
import GCCPlayerLevel from './GCCPlayerLevel.vue'
import KDR from './KDR.vue'

const GCCPlayerProgressComponent = defineComponent({
  components: {
    VueSlider,
    GCCPlayerLevel,
    KDR
  },
  props: {
    playerId: {
      type: String,
      required: true
    }
  },

  setup() {
    return {
      rating: ref(0),
      stats: ref(null),
      isLoading: ref(false),
      dotOptions: [
        {
          tooltip: 'none',
        },
        {
          tooltip: 'always',
          tooltipPlacement: 'top'
        },
        {
          tooltip: 'hover',
          tooltipPlacement: 'bottom'
        },
      ],
      tooltipPlacements: [
        'bottom',
        'top',
        'bottom'
      ]
    };
  },

  created(){
    this.isLoading = true
    userAPI.boxInitialMatches(this.playerId).then((data) => {
      this.stats = data
    }).finally(() => {
      this.isLoading = false
    });
  },

  computed: {
    logoStyle() {
      return {
        'background-image': `url(${window.browser.runtime.getURL("../../assets/logo_500.png")})`,
        'background-repeat': 'no-repeat'
      }
    },

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
        return this.stats.lastMatches[this.stats.lastMatches.length - 1]
      }
      return null
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
    position: absolute;
    bottom: -10px;
    right: 0;
  }

  .rating-diff {
    font-family: Poppins, sans-serif;
    font-weight: bold;

    &--win {
      color: $green;
    }

    &--draw {
      color: $yellow;
    }

    &--loss {
      color: $red;
    }
  }
}


.custom-mark {
  position: absolute;
  top: -10px;
  white-space: nowrap;

  &--min {
    transform: translateX(-100%);
  }
}
</style>
