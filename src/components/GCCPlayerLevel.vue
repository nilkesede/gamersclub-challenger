<template>
  <span class="gcc-player-level-badge" :key="componentKey"
    :style="levelStyle">
    <span class="gcc-player-level">{{level}}</span>
  </span>
</template>

<script>
import { gcAssetsUrls } from "@/utils/gcUrls";
import { defineComponent } from "vue";

const GCCPlayerLevelComponent = defineComponent({
  props: {
    level: {
      type: Number,
      required: true
    }
  },

  setup(props) {
    return {
    };
  },

  computed: {
    levelStyle() {
      const bgUrl = gcAssetsUrls.backgroundLevel(this.level)
      return {
        'background-image': `url(${bgUrl})`,
        'background-repeat': 'no-repeat'
      }
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
}

.gcc-player-level {
  font-family: Poppins, sans-serif;
  font-weight: bold;
  font-size: 11px;
  color: white;
}
</style>
