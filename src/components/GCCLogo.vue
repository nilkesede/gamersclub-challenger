<template>
  <span class="gcc-logo-component" :style="logoStyle" title="GamersClub Challenger">
  </span>
</template>

<script>
import { defineComponent } from "vue";

const GCCLogoComponent = defineComponent({
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
    logoStyle() {
      return {
        'background-image': `url(${window.browser.runtime.getURL("../../assets/logo_500.png")})`,
        'background-repeat': 'no-repeat'
      }
    }
  }
});

export default GCCLogoComponent
</script>

<style lang="scss">
@use "sass:color";
@import "../styles/_variables.scss";

.gcc-logo-component {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: cover;
}
</style>
