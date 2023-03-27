<template>
  <span class="gcc-player-level-badge"
    :class="{
      'gcc-player-level-badge--gc-subscriber': isGamersclubSubscriber,
      'gcc-player-level-badge--not-gc-subscriber': !isGamersclubSubscriber,
    }"
    :style="levelStyle">
    <span class="gcc-player-level">{{level}}</span>
  </span>
</template>

<script>
import { gcAssetsUrls } from "@/apps/shared/extras/gc/api/resources/urls";
import { gcLevelsMap } from '@/apps/shared/extras/gc/levels';
import { defineComponent } from "vue";

const GCCPlayerLevelComponent = defineComponent({
  props: {
    level: {
      type: Number,
      required: true
    },
    isGamersclubSubscriber: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  setup(props) {
    return {
    };
  },

  computed: {
    levelStyle() {
      let style = {}
      if(this.isGamersclubSubscriber){
        const bgUrl = gcAssetsUrls.backgroundLevel(this.level)
        style = {
          'background-image': `url(${bgUrl})`,
          'background-repeat': 'no-repeat'
        }
      } else {
        const bgColor = gcLevelsMap[this.level]?.color
        style = {
          'background-color': bgColor
        }
      }
      return style
    }
  }
});

export default GCCPlayerLevelComponent
</script>

<style lang="scss">
@use "sass:color";
@import "../styles/_variables.scss";

.gcc-player-level-badge {
  display: inline-block;
  width: 25px;
  height: 25px;
  text-align: center;
  background-size: cover;

  &--not-gc-subscriber {
    border-radius: 100%;
  }
}

.gcc-player-level {
  font-family: Poppins, sans-serif;
  font-weight: bold;
  font-size: 11px;
  color: white;
}
</style>
