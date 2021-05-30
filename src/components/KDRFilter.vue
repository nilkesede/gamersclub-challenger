<template>
  <p :class=[labelClass]>KDR</p>
  <div class="gcc-kdr-filter">
    <vue-slider v-model="modelValue"
      :interval="0.1"
      :marks="[1, 1.2, 1.7, 2]"
      :min="1"
      :max="2"
      tooltip="always"
      tooltipPlacement="right"
      ></vue-slider>
  </div>
</template>

<script lang="ts">
import { Options, Vue, } from 'vue-class-component'
import { ref, watch } from 'vue'
import { gcSelectors } from '../scripts/lobby/gcSelectors'
import { cleanSelector } from '@/utils/StringUtils'
import VueSlider from 'vue-slider-component'
import lobbyFilter from '@/scripts/lobby/lobbyFilter'

@Options({
  components: {
    VueSlider,
  },

  props: {
    value: Number
  }
})
export default class KDR extends Vue {
  value!: number

  data(): any{
    const modelValue = ref(this.value)
    watch(modelValue, this.onChangeFilter)

    return {
      modelValue,
      gcSelectors,
    }
  }

  get labelClass(): string {
    return cleanSelector(gcSelectors.filterLabel)
  }

  onChangeFilter(value: number): void {
    lobbyFilter.filter.call(lobbyFilter, { kdr: value })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @use "sass:color";

  .gcc-kdr-filter {
    color: white;
  }


</style>
