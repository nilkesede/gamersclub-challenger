<template>
  <div class="gcc-lobby-name-filter">
    <input
      type="text"
      v-model="modelValue"
      :placeholder="i18n.getMessage('filterByPlayerName')"
      class="gcc-lobby-name-filter__input"
    />
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
import { staticEvents } from "@/apps/shared/tools/analytics/events";

@Options({
  components: {
    VueSlider,
  },

  props: {
    value: String,
  },
})
export default class LobbyNameFilter extends Vue {
  value!: string;
  filterTimeoutHolder: any;

  data(): any {
    const modelValue = ref(this.value);
    watch(modelValue, this.onChangeFilter);

    return {
      modelValue,
      gcSelectors,
      i18n: window.browser.i18n,
    };
  }

  get labelClass(): string {
    return cleanSelector(gcSelectors.lobbies.filters.section.label);
  }

  filter(value: string): void {
    AnalyticsManager.sendEvent(staticEvents.FILTER_BY_LOBBY_PLAYER_NAME);
    lobbyFilter.filter.call(lobbyFilter, { playerName: value });
  }

  onChangeFilter(value: string): void {
    clearTimeout(this.filterTimeoutHolder);
    this.filterTimeoutHolder = setTimeout(() => this.filter(value), 300);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@use "sass:color";

.gcc-lobby-name-filter {
  width: 100%;

  &__input {
    border-radius: 5px;
    background-color: #212335;
    border: 1px solid hsla(0, 0%, 100%, 0.04);
    color: hsla(0, 0%, 100%, 0.8);
    transition: background-color 0.2s ease-in-out;

    &:focus {
      box-shadow: 1px 0px 6px 0px #243a4e;
      background: white;
      color: black;
    }
  }
}
</style>
