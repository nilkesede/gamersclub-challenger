<template>
  <p :class="[labelClass]">KDR</p>
  <div class="gcc-kdr-filter">
    <vue-slider
      v-model="modelValue"
      :interval="0.1"
      :marks="{
        '1': '1',
        '1.2': '1.2',
        '1.5': '1.5',
        '1.7': '1.7',
        '2': '2+'
      }"
      :min="1"
      :max="2"
      tooltip="always"
      tooltipPlacement="top"
    ></vue-slider>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ref, watch } from "vue";
import { gcSelectors } from "@/apps/shared/extras/gc/tools/selectors";
import { cleanSelector } from "@/apps/shared/core/settings/extensions/string.setup";
import VueSlider from "vue-slider-component";
import lobbyFilter from "@/apps/contentScripts/lobby/extensions/filters/lobbyFilter";
import AnalyticsManager from "@/apps/shared/tools/analytics";
import { dynamicEvents } from "@/apps/shared/tools/analytics/events";
import { customDimentions } from "@/apps/shared/tools/analytics/dimentions";

@Options({
  components: {
    VueSlider,
  },

  props: {
    value: Number,
  },
})
export default class KDR extends Vue {
  value!: number;
  metricsTimeoutHolder: any;

  data(): any {
    const modelValue = ref(this.value);
    watch(modelValue, this.onChangeFilter);

    return {
      modelValue,
      gcSelectors,
      labelClass: cleanSelector(gcSelectors.lobbies.filters.section.label),
    };
  }

  sendMetrics(value: number): void {
    AnalyticsManager.sendEvent(dynamicEvents({ value }).FILTER_BY_KDR);
    AnalyticsManager.set(customDimentions.kdrFilterNumber, value.toString());
  }

  onChangeFilter(value: number): void {
    lobbyFilter.filter.call(lobbyFilter, { kdr: value });
    clearTimeout(this.metricsTimeoutHolder);
    this.metricsTimeoutHolder = setTimeout(() => this.sendMetrics(value), 500);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@use "sass:color";

.gcc-kdr-filter {
  color: white;
  width: 100%;
  padding-top: 30px;
}
</style>
